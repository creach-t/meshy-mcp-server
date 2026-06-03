/**
 * Image generation tools (text-to-image, image-to-image)
 *
 * FIX vs upstream: both tools now auto-poll until completion
 * and return image_urls directly instead of just a task_id.
 */

import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MeshyClient } from "../services/meshy-client.js";
import { handleMeshyError } from "../services/error-handler.js";
import { fileToDataUri } from "../services/file-utils.js";
import { TextToImageInputSchema, ImageToImageInputSchema } from "../schemas/image.js";
import { TaskCreatedOutputSchema } from "../schemas/output.js";
import { ResponseFormat, TaskStatus, POLL_INITIAL_DELAY, POLL_MAX_DELAY, POLL_BACKOFF_FACTOR } from "../constants.js";
import { formatTaskCreatedResponse } from "../utils/response-formatter.js";
import {
  CreateTaskApiResponse,
  TextToImageApiRequest,
  ImageToImageApiRequest,
  GetTaskResponse
} from "../types.js";

const IMAGE_POLL_TIMEOUT_MS = 120_000; // 2 min max

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Poll until the image task reaches a terminal state, then return image_urls.
 * Throws on failure/timeout.
 */
async function pollImageTask(
  client: MeshyClient,
  taskId: string,
  endpoint: string
): Promise<string[]> {
  const start = Date.now();
  let delay = POLL_INITIAL_DELAY;

  while (true) {
    const task = await client.get<GetTaskResponse>(`${endpoint}/${taskId}`);

    if (task.status === TaskStatus.SUCCEEDED) {
      if (!task.image_urls || task.image_urls.length === 0) {
        throw new Error("Task succeeded but image_urls is empty — unexpected API response.");
      }
      return task.image_urls;
    }

    if (task.status === TaskStatus.FAILED) {
      const msg = task.task_error?.message || "Unknown error";
      throw new Error(`Image generation failed: ${msg}`);
    }

    if (task.status === TaskStatus.CANCELED) {
      throw new Error("Image generation task was canceled.");
    }

    if (Date.now() - start + delay > IMAGE_POLL_TIMEOUT_MS) {
      throw new Error(`Timeout: image task still ${task.status} after ${Math.round((Date.now() - start) / 1000)}s.`);
    }

    await sleep(delay);
    delay = Math.min(delay * POLL_BACKOFF_FACTOR, POLL_MAX_DELAY);
  }
}

/**
 * Register image generation tools with the MCP server
 */
export function registerImageTools(server: McpServer, client: MeshyClient) {
  // Text-to-image tool
  server.registerTool(
    "meshy_text_to_image",
    {
      title: "Generate 2D Image from Text",
      description: `Generate a 2D image from a text description using Meshy AI.

Polls automatically until completion and returns image URLs directly.

Args:
  - ai_model (enum): "nano-banana" or "nano-banana-pro" (required)
  - prompt (string): Text description (2-600 chars, required)
  - generate_multi_view (boolean, optional): Generate 3 viewpoint images (default: false)
  - pose_mode (enum, optional): "a-pose" or "t-pose"
  - aspect_ratio (enum, optional): "1:1", "16:9", "9:16", "4:3", "3:4" (default: "1:1")
  - response_format (enum): "markdown" or "json" (default: "markdown")

Returns image URLs directly once generation completes (~1-2 min).

Error Handling:
  - Returns "InsufficientCredits" if account needs upgrade`,
      inputSchema: TextToImageInputSchema,
      outputSchema: TaskCreatedOutputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true
      }
    },
    async (params: z.infer<typeof TextToImageInputSchema>) => {
      try {
        const request: TextToImageApiRequest = {
          ai_model: params.ai_model,
          prompt: params.prompt,
          generate_multi_view: params.generate_multi_view,
          aspect_ratio: params.aspect_ratio
        };

        if (params.pose_mode) request.pose_mode = params.pose_mode;

        const response = await client.post<CreateTaskApiResponse>("/openapi/v1/text-to-image", request as unknown as Record<string, unknown>);
        const taskId = response.result;

        // Poll until done and return image URLs directly
        const imageUrls = await pollImageTask(client, taskId, "/openapi/v1/text-to-image");

        const multiView = imageUrls.length > 1;
        const lines = [
          `# Image Generated`,
          ``,
          `**Task ID**: ${taskId}`,
          `**Prompt**: ${params.prompt}`,
          ``,
          `## ${multiView ? `Images (${imageUrls.length} views)` : "Image"}`,
        ];
        imageUrls.forEach((url, i) => {
          const label = multiView ? `View ${i + 1}` : "Image URL";
          lines.push(`- **${label}**: ${url}`);
        });

        return {
          content: [{ type: "text" as const, text: lines.join("\n") }],
          structuredContent: { task_id: taskId, image_urls: imageUrls }
        };
      } catch (error) {
        return {
          isError: true,
          content: [{
            type: "text",
            text: handleMeshyError(error)
          }]
        };
      }
    }
  );

  // Image-to-image tool
  server.registerTool(
    "meshy_image_to_image",
    {
      title: "Transform Image using AI",
      description: `Transform images using AI with a text prompt and reference images using Meshy AI.

Polls automatically until completion and returns image URLs directly.

Reference Image Input (provide ONE of these):
  - reference_image_urls (array): 1–5 publicly accessible reference image URLs
  - reference_file_paths (array): 1–5 absolute paths to LOCAL image files. Server reads and encodes them automatically.

Other Args:
  - ai_model (enum): "nano-banana" or "nano-banana-pro" (required)
  - prompt (string): Text description guiding the transformation (required)
  - generate_multi_view (boolean, optional): Generate multiple viewpoint images (default: false)
  - response_format (enum): Output format (default: "markdown")

Error Handling:
  - Returns "InvalidImageUrl" if any reference image is not accessible
  - Returns "File not found" if any file_path doesn't exist`,
      inputSchema: ImageToImageInputSchema,
      outputSchema: TaskCreatedOutputSchema,
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: true
      }
    },
    async (params: z.infer<typeof ImageToImageInputSchema>) => {
      try {
        let resolvedUrls: string[];
        if (params.reference_file_paths && params.reference_file_paths.length > 0) {
          resolvedUrls = await Promise.all(
            params.reference_file_paths.map(fp => fileToDataUri(fp))
          );
        } else if (params.reference_image_urls && params.reference_image_urls.length > 0) {
          resolvedUrls = params.reference_image_urls;
        } else {
          throw new Error("Either reference_image_urls or reference_file_paths must be provided.");
        }

        const request: ImageToImageApiRequest = {
          ai_model: params.ai_model,
          prompt: params.prompt,
          reference_image_urls: resolvedUrls,
          generate_multi_view: params.generate_multi_view
        };

        const response = await client.post<CreateTaskApiResponse>("/openapi/v1/image-to-image", request as unknown as Record<string, unknown>);
        const taskId = response.result;

        // Poll until done and return image URLs directly
        const imageUrls = await pollImageTask(client, taskId, "/openapi/v1/image-to-image");

        const multiView = imageUrls.length > 1;
        const lines = [
          `# Image Transformed`,
          ``,
          `**Task ID**: ${taskId}`,
          `**Prompt**: ${params.prompt}`,
          ``,
          `## ${multiView ? `Images (${imageUrls.length} views)` : "Image"}`,
        ];
        imageUrls.forEach((url, i) => {
          const label = multiView ? `View ${i + 1}` : "Image URL";
          lines.push(`- **${label}**: ${url}`);
        });

        return {
          content: [{ type: "text" as const, text: lines.join("\n") }],
          structuredContent: { task_id: taskId, image_urls: imageUrls }
        };
      } catch (error) {
        return {
          isError: true,
          content: [{
            type: "text",
            text: handleMeshyError(error)
          }]
        };
      }
    }
  );
}
