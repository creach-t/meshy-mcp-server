/**
 * Common Zod schemas shared across tools
 */
import { z } from "zod";
import { ResponseFormat, TaskType } from "../constants.js";
/**
 * Response format schema
 */
export declare const ResponseFormatSchema: z.ZodDefault<z.ZodNativeEnum<typeof ResponseFormat>>;
/**
 * Pagination schema
 */
export declare const PaginationSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    offset: number;
}, {
    limit?: number | undefined;
    offset?: number | undefined;
}>;
/**
 * Task ID schema
 */
export declare const TaskIdSchema: z.ZodString;
/**
 * URL schema
 */
export declare const UrlSchema: z.ZodString;
/**
 * Prompt schema
 */
export declare const PromptSchema: z.ZodString;
/**
 * Task type schema
 */
export declare const TaskTypeSchema: z.ZodDefault<z.ZodNativeEnum<typeof TaskType>>;
