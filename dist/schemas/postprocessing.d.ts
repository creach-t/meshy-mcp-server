/**
 * Zod schemas for post-processing tools (remesh, retexture, rig, animate)
 */
import { z } from "zod";
import { AIModel, OriginAt, Topology, AnimationPostProcessOp } from "../constants.js";
/**
 * Remesh input schema
 */
export declare const RemeshInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    target_formats: z.ZodDefault<z.ZodArray<z.ZodEnum<["glb", "fbx", "obj", "usdz", "blend", "stl", "3mf"]>, "many">>;
    topology: z.ZodOptional<z.ZodNativeEnum<typeof Topology>>;
    target_polycount: z.ZodOptional<z.ZodNumber>;
    resize_height: z.ZodDefault<z.ZodNumber>;
    auto_size: z.ZodOptional<z.ZodBoolean>;
    origin_at: z.ZodOptional<z.ZodNativeEnum<typeof OriginAt>>;
    convert_format_only: z.ZodDefault<z.ZodBoolean>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    target_formats: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "blend" | "stl")[];
    response_format: import("../constants.js").ResponseFormat;
    resize_height: number;
    convert_format_only: boolean;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    auto_size?: boolean | undefined;
    origin_at?: OriginAt | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}, {
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "blend" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: OriginAt | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
    resize_height?: number | undefined;
    convert_format_only?: boolean | undefined;
}>;
/**
 * Retexture input schema
 */
export declare const RetextureInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    text_style_prompt: z.ZodOptional<z.ZodString>;
    image_style_url: z.ZodOptional<z.ZodString>;
    ai_model: z.ZodDefault<z.ZodNativeEnum<typeof AIModel>>;
    enable_original_uv: z.ZodDefault<z.ZodBoolean>;
    enable_pbr: z.ZodDefault<z.ZodBoolean>;
    remove_lighting: z.ZodDefault<z.ZodBoolean>;
    target_formats: z.ZodOptional<z.ZodArray<z.ZodEnum<["glb", "obj", "fbx", "stl", "usdz", "3mf"]>, "many">>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    ai_model: AIModel;
    response_format: import("../constants.js").ResponseFormat;
    enable_pbr: boolean;
    remove_lighting: boolean;
    enable_original_uv: boolean;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
    text_style_prompt?: string | undefined;
    image_style_url?: string | undefined;
}, {
    ai_model?: AIModel | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    enable_pbr?: boolean | undefined;
    remove_lighting?: boolean | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
    text_style_prompt?: string | undefined;
    image_style_url?: string | undefined;
    enable_original_uv?: boolean | undefined;
}>;
/**
 * Rig (rigging) input schema
 */
export declare const RigInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    height_meters: z.ZodDefault<z.ZodNumber>;
    texture_image_url: z.ZodOptional<z.ZodString>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    height_meters: number;
    texture_image_url?: string | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}, {
    response_format?: import("../constants.js").ResponseFormat | undefined;
    texture_image_url?: string | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
    height_meters?: number | undefined;
}>;
/**
 * Animate input schema
 */
export declare const AnimateInputSchema: z.ZodObject<{
    rig_task_id: z.ZodString;
    action_id: z.ZodNumber;
    post_process: z.ZodOptional<z.ZodObject<{
        operation_type: z.ZodNativeEnum<typeof AnimationPostProcessOp>;
        fps: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<24>, z.ZodLiteral<25>, z.ZodLiteral<30>, z.ZodLiteral<60>]>>;
    }, "strip", z.ZodTypeAny, {
        operation_type: AnimationPostProcessOp;
        fps?: 30 | 24 | 60 | 25 | undefined;
    }, {
        operation_type: AnimationPostProcessOp;
        fps?: 30 | 24 | 60 | 25 | undefined;
    }>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    rig_task_id: string;
    action_id: number;
    post_process?: {
        operation_type: AnimationPostProcessOp;
        fps?: 30 | 24 | 60 | 25 | undefined;
    } | undefined;
}, {
    rig_task_id: string;
    action_id: number;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    post_process?: {
        operation_type: AnimationPostProcessOp;
        fps?: 30 | 24 | 60 | 25 | undefined;
    } | undefined;
}>;
