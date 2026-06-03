/**
 * Output schemas for MCP structured content.
 * These define the shape of structuredContent returned by tools.
 */
import { z } from "zod";
/**
 * Output schema for task creation tools (text-to-3d, image-to-3d, remesh, etc.)
 */
export declare const TaskCreatedOutputSchema: z.ZodObject<{
    task_id: z.ZodString;
    status: z.ZodString;
    message: z.ZodString;
    estimated_time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    message: string;
    status: string;
    task_id: string;
    estimated_time: string;
}, {
    message: string;
    status: string;
    task_id: string;
    estimated_time: string;
}>;
/**
 * Output schema for meshy_check_balance
 */
export declare const BalanceOutputSchema: z.ZodObject<{
    balance: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    balance: number;
}, {
    balance: number;
}>;
/**
 * Output schema for meshy_get_task_status
 * Covers all outcomes: SUCCEEDED, FAILED, CANCELED, TIMEOUT, IN_PROGRESS, PENDING
 */
export declare const TaskStatusOutputSchema: z.ZodObject<{
    outcome: z.ZodEnum<["SUCCEEDED", "FAILED", "CANCELED", "TIMEOUT", "IN_PROGRESS", "PENDING"]>;
    task_id: z.ZodString;
    status: z.ZodString;
    progress: z.ZodNumber;
    wait_time_seconds: z.ZodOptional<z.ZodNumber>;
    poll_count: z.ZodOptional<z.ZodNumber>;
    model_urls: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    vertex_count: z.ZodOptional<z.ZodNumber>;
    face_count: z.ZodOptional<z.ZodNumber>;
    error_code: z.ZodOptional<z.ZodString>;
    error_message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: string;
    task_id: string;
    outcome: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "TIMEOUT";
    progress: number;
    wait_time_seconds?: number | undefined;
    poll_count?: number | undefined;
    model_urls?: Record<string, string> | undefined;
    vertex_count?: number | undefined;
    face_count?: number | undefined;
    error_code?: string | undefined;
    error_message?: string | undefined;
}, {
    status: string;
    task_id: string;
    outcome: "PENDING" | "IN_PROGRESS" | "SUCCEEDED" | "FAILED" | "CANCELED" | "TIMEOUT";
    progress: number;
    wait_time_seconds?: number | undefined;
    poll_count?: number | undefined;
    model_urls?: Record<string, string> | undefined;
    vertex_count?: number | undefined;
    face_count?: number | undefined;
    error_code?: string | undefined;
    error_message?: string | undefined;
}>;
