/**
 * Image generation tools (text-to-image, image-to-image)
 */
import { handleMeshyError } from "../services/error-handler.js";
import { fileToDataUri } from "../services/file-utils.js";
import { TextToImageInputSchema, ImageToImageInputSchema } from "../schemas/image.js";
import { TaskCreatedOutputSchema } from "../schemas/output.js";
import { formatTaskCreatedResponse } from "../utils/response-formatter.js";
import { TaskStatus, POLL_INITIAL_DELAY, POLL_MAX_DELAY, POLL_BACKOFF_FACTOR } from "../constants.js";
async function pollImageTask(client, taskId, endpoint, timeoutMs = 120000) {
    const start = Date.now();
    let delay = POLL_INITIAL_DELAY;
    while (true) {
        const task = await client.get(`${endpoint}/${taskId}`);
        if (task.status === TaskStatus.SUCCEEDED) return task;
        if (task.status === TaskStatus.FAILED) throw new Error(task.task_error?.message || "Task failed");
        if (Date.now() - start > timeoutMs) throw new Error(`Timeout after ${timeoutMs / 1000}s waiting for image`);
        await new Promise(r => setTimeout(r, delay));
        delay = Math.min(delay * POLL_BACKOFF_FACTOR, POLL_MAX_DELAY);
    }
}
export function registerImageTools(server, client) {
    server.registerTool("meshy_text_to_image", {
        title: "Generate 2D Image from Text",
        description: `Generate a 2D image from a text description using Meshy AI.\n\nArgs:\n  - ai_model (enum): "nano-banana" or "nano-banana-pro" (required)\n  - prompt (string): Text description (required)\n  - generate_multi_view (boolean, optional)\n  - pose_mode (enum, optional): "a-pose" or "t-pose"\n  - aspect_ratio (enum, optional): default "1:1"\n  - response_format (enum): default "markdown"`,
        inputSchema: TextToImageInputSchema,
        outputSchema: TaskCreatedOutputSchema,
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true }
    }, async (params) => {
        try {
            const request = { ai_model: params.ai_model, prompt: params.prompt, generate_multi_view: params.generate_multi_view, aspect_ratio: params.aspect_ratio };
            if (params.pose_mode) request.pose_mode = params.pose_mode;
            const response = await client.post("/openapi/v1/text-to-image", request);
            const taskId = response.result;
            const task = await pollImageTask(client, taskId, "/openapi/v1/text-to-image");
            return {
                content: [{ type: "text", text: "# Images Generated\n\n**Task ID**: " + taskId + "\n**Images**:\n" + ((task.image_urls || []).map((u, i) => (i+1) + ". " + u).join("\n") || "none") }],
                structuredContent: { task_id: taskId, status: "SUCCEEDED", image_urls: task.image_urls || [], thumbnail_url: task.thumbnail_url }
            };
        } catch (error) {
            return { isError: true, content: [{ type: "text", text: handleMeshyError(error) }] };
        }
    });
    server.registerTool("meshy_image_to_image", {
        title: "Transform Image using AI",
        description: `Transform images using AI with a text prompt and reference images using Meshy AI.\n\nReference Image Input (provide ONE of these):\n  - reference_image_urls (array): 1-5 public URLs\n  - reference_file_paths (array): 1-5 absolute local file paths`,
        inputSchema: ImageToImageInputSchema,
        outputSchema: TaskCreatedOutputSchema,
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true }
    }, async (params) => {
        try {
            let resolvedUrls;
            if (params.reference_file_paths && params.reference_file_paths.length > 0) {
                resolvedUrls = await Promise.all(params.reference_file_paths.map(fp => fileToDataUri(fp)));
            } else if (params.reference_image_urls && params.reference_image_urls.length > 0) {
                resolvedUrls = params.reference_image_urls;
            } else {
                throw new Error("Either reference_image_urls or reference_file_paths must be provided.");
            }
            const request = { ai_model: params.ai_model, prompt: params.prompt, reference_image_urls: resolvedUrls, generate_multi_view: params.generate_multi_view };
            const response = await client.post("/openapi/v1/image-to-image", request);
            const taskId = response.result;
            const task = await pollImageTask(client, taskId, "/openapi/v1/image-to-image");
            return {
                content: [{ type: "text", text: "# Images Generated\n\n**Task ID**: " + taskId + "\n**Images**:\n" + ((task.image_urls || []).map((u, i) => (i+1) + ". " + u).join("\n") || "none") }],
                structuredContent: { task_id: taskId, status: "SUCCEEDED", image_urls: task.image_urls || [], thumbnail_url: task.thumbnail_url }
            };
        } catch (error) {
            return { isError: true, content: [{ type: "text", text: handleMeshyError(error) }] };
        }
    });
}
