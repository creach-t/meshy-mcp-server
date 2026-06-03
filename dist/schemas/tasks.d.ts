/**
 * Zod schemas for task management tools
 */
import { z } from "zod";
import { TaskStatus, TaskPhase, TaskType } from "../constants.js";
/**
 * Get task status input schema (also supports wait mode)
 */
export declare const GetTaskStatusInputSchema: z.ZodObject<{
    task_id: z.ZodString;
    task_type: z.ZodDefault<z.ZodNativeEnum<typeof TaskType>>;
    wait: z.ZodDefault<z.ZodBoolean>;
    timeout_seconds: z.ZodDefault<z.ZodNumber>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    task_id: string;
    task_type: TaskType;
    wait: boolean;
    timeout_seconds: number;
}, {
    task_id: string;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    task_type?: TaskType | undefined;
    wait?: boolean | undefined;
    timeout_seconds?: number | undefined;
}>;
/**
 * List tasks input schema
 */
export declare const ListTasksInputSchema: z.ZodObject<{
    task_type: z.ZodOptional<z.ZodNativeEnum<typeof TaskType>>;
    sort_by: z.ZodDefault<z.ZodEnum<["+created_at", "-created_at"]>>;
    status: z.ZodOptional<z.ZodNativeEnum<typeof TaskStatus>>;
    phase: z.ZodOptional<z.ZodNativeEnum<typeof TaskPhase>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
} & {
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    limit: number;
    offset: number;
    response_format: import("../constants.js").ResponseFormat;
    sort_by: "+created_at" | "-created_at";
    status?: TaskStatus | undefined;
    task_type?: TaskType | undefined;
    phase?: TaskPhase | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    status?: TaskStatus | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    task_type?: TaskType | undefined;
    sort_by?: "+created_at" | "-created_at" | undefined;
    phase?: TaskPhase | undefined;
}>;
/**
 * Cancel task input schema
 */
export declare const CancelTaskInputSchema: z.ZodObject<{
    task_id: z.ZodString;
    task_type: z.ZodDefault<z.ZodNativeEnum<typeof TaskType>>;
}, "strict", z.ZodTypeAny, {
    task_id: string;
    task_type: TaskType;
}, {
    task_id: string;
    task_type?: TaskType | undefined;
}>;
/**
 * Download model input schema
 */
export declare const DownloadModelInputSchema: z.ZodObject<{
    task_id: z.ZodString;
    task_type: z.ZodDefault<z.ZodNativeEnum<typeof TaskType>>;
    format: z.ZodDefault<z.ZodEnum<["glb", "fbx", "usdz", "stl", "obj", "3mf"]>>;
    include_textures: z.ZodDefault<z.ZodBoolean>;
    save_to: z.ZodOptional<z.ZodString>;
    parent_task_id: z.ZodOptional<z.ZodString>;
    print_ready: z.ZodOptional<z.ZodBoolean>;
    print_height_mm: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    task_id: string;
    task_type: TaskType;
    format: "glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl";
    include_textures: boolean;
    save_to?: string | undefined;
    parent_task_id?: string | undefined;
    print_ready?: boolean | undefined;
    print_height_mm?: number | undefined;
}, {
    task_id: string;
    task_type?: TaskType | undefined;
    format?: "glb" | "fbx" | "usdz" | "3mf" | "obj" | "stl" | undefined;
    include_textures?: boolean | undefined;
    save_to?: string | undefined;
    parent_task_id?: string | undefined;
    print_ready?: boolean | undefined;
    print_height_mm?: number | undefined;
}>;
/**
 * List models input schema
 */
export declare const ListModelsInputSchema: z.ZodObject<{
    workspace_id: z.ZodOptional<z.ZodString>;
    filter: z.ZodDefault<z.ZodEnum<["all", "published", "private"]>>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
} & {
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    limit: number;
    offset: number;
    filter: "all" | "published" | "private";
    response_format: import("../constants.js").ResponseFormat;
    workspace_id?: string | undefined;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
    filter?: "all" | "published" | "private" | undefined;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    workspace_id?: string | undefined;
}>;
