/**
 * Zod schemas for generation tools
 */
import { z } from "zod";
import { AIModel, ModelType, SymmetryMode, Topology, PoseMode } from "../constants.js";
/**
 * Text-to-3D input schema
 */
export declare const TextTo3DInputSchema: z.ZodObject<{
    prompt: z.ZodString;
    ai_model: z.ZodDefault<z.ZodNativeEnum<typeof AIModel>>;
    model_type: z.ZodOptional<z.ZodNativeEnum<typeof ModelType>>;
    topology: z.ZodOptional<z.ZodNativeEnum<typeof Topology>>;
    target_polycount: z.ZodOptional<z.ZodNumber>;
    symmetry_mode: z.ZodOptional<z.ZodNativeEnum<typeof SymmetryMode>>;
    should_remesh: z.ZodOptional<z.ZodBoolean>;
    pose_mode: z.ZodOptional<z.ZodNativeEnum<typeof PoseMode>>;
    target_formats: z.ZodOptional<z.ZodArray<z.ZodEnum<["glb", "obj", "fbx", "stl", "usdz", "3mf"]>, "many">>;
    auto_size: z.ZodOptional<z.ZodBoolean>;
    origin_at: z.ZodOptional<z.ZodEnum<["bottom", "center"]>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    prompt: string;
    ai_model: AIModel;
    response_format: import("../constants.js").ResponseFormat;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
}, {
    prompt: string;
    ai_model?: AIModel | undefined;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
}>;
/**
 * Image-to-3D input schema
 */
export declare const ImageTo3DInputSchema: z.ZodObject<{
    image_url: z.ZodOptional<z.ZodString>;
    file_path: z.ZodOptional<z.ZodString>;
    ai_model: z.ZodDefault<z.ZodNativeEnum<typeof AIModel>>;
    model_type: z.ZodOptional<z.ZodNativeEnum<typeof ModelType>>;
    pose_mode: z.ZodOptional<z.ZodNativeEnum<typeof PoseMode>>;
    enable_pbr: z.ZodDefault<z.ZodBoolean>;
    topology: z.ZodOptional<z.ZodNativeEnum<typeof Topology>>;
    target_polycount: z.ZodOptional<z.ZodNumber>;
    should_remesh: z.ZodOptional<z.ZodBoolean>;
    symmetry_mode: z.ZodOptional<z.ZodNativeEnum<typeof SymmetryMode>>;
    should_texture: z.ZodOptional<z.ZodBoolean>;
    texture_prompt: z.ZodOptional<z.ZodString>;
    texture_image_url: z.ZodOptional<z.ZodString>;
    image_enhancement: z.ZodOptional<z.ZodBoolean>;
    remove_lighting: z.ZodDefault<z.ZodBoolean>;
    save_pre_remeshed_model: z.ZodOptional<z.ZodBoolean>;
    target_formats: z.ZodOptional<z.ZodArray<z.ZodEnum<["glb", "obj", "fbx", "stl", "usdz", "3mf"]>, "many">>;
    auto_size: z.ZodOptional<z.ZodBoolean>;
    origin_at: z.ZodOptional<z.ZodEnum<["bottom", "center"]>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    ai_model: AIModel;
    response_format: import("../constants.js").ResponseFormat;
    enable_pbr: boolean;
    remove_lighting: boolean;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    image_url?: string | undefined;
    file_path?: string | undefined;
    should_texture?: boolean | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
    image_enhancement?: boolean | undefined;
    save_pre_remeshed_model?: boolean | undefined;
}, {
    ai_model?: AIModel | undefined;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    image_url?: string | undefined;
    file_path?: string | undefined;
    enable_pbr?: boolean | undefined;
    should_texture?: boolean | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
    image_enhancement?: boolean | undefined;
    remove_lighting?: boolean | undefined;
    save_pre_remeshed_model?: boolean | undefined;
}>;
/**
 * Text-to-3D Refine input schema
 */
export declare const TextTo3DRefineInputSchema: z.ZodObject<{
    preview_task_id: z.ZodString;
    enable_pbr: z.ZodDefault<z.ZodBoolean>;
    texture_prompt: z.ZodOptional<z.ZodString>;
    texture_image_url: z.ZodOptional<z.ZodString>;
    ai_model: z.ZodDefault<z.ZodNativeEnum<typeof AIModel>>;
    remove_lighting: z.ZodDefault<z.ZodBoolean>;
    target_formats: z.ZodOptional<z.ZodArray<z.ZodEnum<["glb", "obj", "fbx", "stl", "usdz", "3mf"]>, "many">>;
    auto_size: z.ZodOptional<z.ZodBoolean>;
    origin_at: z.ZodOptional<z.ZodEnum<["bottom", "center"]>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    ai_model: AIModel;
    response_format: import("../constants.js").ResponseFormat;
    enable_pbr: boolean;
    remove_lighting: boolean;
    preview_task_id: string;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
}, {
    preview_task_id: string;
    ai_model?: AIModel | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    enable_pbr?: boolean | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
    remove_lighting?: boolean | undefined;
}>;
/**
 * Multi-image-to-3D input schema
 */
export declare const MultiImageTo3DInputSchema: z.ZodObject<{
    image_urls: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    file_paths: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ai_model: z.ZodDefault<z.ZodNativeEnum<typeof AIModel>>;
    model_type: z.ZodOptional<z.ZodNativeEnum<typeof ModelType>>;
    pose_mode: z.ZodOptional<z.ZodNativeEnum<typeof PoseMode>>;
    enable_pbr: z.ZodDefault<z.ZodBoolean>;
    topology: z.ZodOptional<z.ZodNativeEnum<typeof Topology>>;
    target_polycount: z.ZodOptional<z.ZodNumber>;
    should_remesh: z.ZodOptional<z.ZodBoolean>;
    symmetry_mode: z.ZodOptional<z.ZodNativeEnum<typeof SymmetryMode>>;
    should_texture: z.ZodOptional<z.ZodBoolean>;
    texture_prompt: z.ZodOptional<z.ZodString>;
    texture_image_url: z.ZodOptional<z.ZodString>;
    image_enhancement: z.ZodOptional<z.ZodBoolean>;
    remove_lighting: z.ZodDefault<z.ZodBoolean>;
    save_pre_remeshed_model: z.ZodOptional<z.ZodBoolean>;
    target_formats: z.ZodOptional<z.ZodArray<z.ZodEnum<["glb", "obj", "fbx", "stl", "usdz", "3mf"]>, "many">>;
    auto_size: z.ZodOptional<z.ZodBoolean>;
    origin_at: z.ZodOptional<z.ZodEnum<["bottom", "center"]>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    ai_model: AIModel;
    response_format: import("../constants.js").ResponseFormat;
    enable_pbr: boolean;
    remove_lighting: boolean;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    should_texture?: boolean | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
    image_enhancement?: boolean | undefined;
    save_pre_remeshed_model?: boolean | undefined;
    image_urls?: string[] | undefined;
    file_paths?: string[] | undefined;
}, {
    ai_model?: AIModel | undefined;
    model_type?: ModelType | undefined;
    topology?: Topology | undefined;
    target_polycount?: number | undefined;
    symmetry_mode?: SymmetryMode | undefined;
    should_remesh?: boolean | undefined;
    pose_mode?: PoseMode | undefined;
    target_formats?: ("glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl")[] | undefined;
    auto_size?: boolean | undefined;
    origin_at?: "bottom" | "center" | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    enable_pbr?: boolean | undefined;
    should_texture?: boolean | undefined;
    texture_prompt?: string | undefined;
    texture_image_url?: string | undefined;
    image_enhancement?: boolean | undefined;
    remove_lighting?: boolean | undefined;
    save_pre_remeshed_model?: boolean | undefined;
    image_urls?: string[] | undefined;
    file_paths?: string[] | undefined;
}>;
