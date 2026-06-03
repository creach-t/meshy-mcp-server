/**
 * Zod schemas for image generation tools (text-to-image, image-to-image)
 */
import { z } from "zod";
import { TextToImageModel, AspectRatio, PoseMode } from "../constants.js";
/**
 * Text-to-image input schema
 */
export declare const TextToImageInputSchema: z.ZodObject<{
    ai_model: z.ZodNativeEnum<typeof TextToImageModel>;
    prompt: z.ZodString;
    generate_multi_view: z.ZodDefault<z.ZodBoolean>;
    pose_mode: z.ZodOptional<z.ZodNativeEnum<typeof PoseMode>>;
    aspect_ratio: z.ZodDefault<z.ZodNativeEnum<typeof AspectRatio>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    prompt: string;
    ai_model: TextToImageModel;
    response_format: import("../constants.js").ResponseFormat;
    generate_multi_view: boolean;
    aspect_ratio: AspectRatio;
    pose_mode?: PoseMode | undefined;
}, {
    prompt: string;
    ai_model: TextToImageModel;
    pose_mode?: PoseMode | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    generate_multi_view?: boolean | undefined;
    aspect_ratio?: AspectRatio | undefined;
}>;
/**
 * Image-to-image input schema
 */
export declare const ImageToImageInputSchema: z.ZodObject<{
    ai_model: z.ZodNativeEnum<typeof TextToImageModel>;
    prompt: z.ZodString;
    reference_image_urls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reference_file_paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    generate_multi_view: z.ZodDefault<z.ZodBoolean>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    prompt: string;
    ai_model: TextToImageModel;
    response_format: import("../constants.js").ResponseFormat;
    generate_multi_view: boolean;
    reference_image_urls?: string[] | undefined;
    reference_file_paths?: string[] | undefined;
}, {
    prompt: string;
    ai_model: TextToImageModel;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    generate_multi_view?: boolean | undefined;
    reference_image_urls?: string[] | undefined;
    reference_file_paths?: string[] | undefined;
}>;
