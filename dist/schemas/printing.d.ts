/**
 * Zod schemas for 3D printing tools
 */
import { z } from "zod";
/**
 * Send to slicer input schema (cross-platform 7-slicer detection).
 */
export declare const SendToSlicerInputSchema: z.ZodObject<{
    model_url: z.ZodString;
    slicer_type: z.ZodDefault<z.ZodEnum<["auto", "bambu", "orcaslicer", "creality_print", "elegoo_slicer", "anycubic_slicer", "prusaslicer", "cura"]>>;
    file_name: z.ZodDefault<z.ZodString>;
    is_multicolor: z.ZodDefault<z.ZodBoolean>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    model_url: string;
    slicer_type: "auto" | "bambu" | "orcaslicer" | "creality_print" | "elegoo_slicer" | "anycubic_slicer" | "prusaslicer" | "cura";
    file_name: string;
    is_multicolor: boolean;
}, {
    model_url: string;
    response_format?: import("../constants.js").ResponseFormat | undefined;
    slicer_type?: "auto" | "bambu" | "orcaslicer" | "creality_print" | "elegoo_slicer" | "anycubic_slicer" | "prusaslicer" | "cura" | undefined;
    file_name?: string | undefined;
    is_multicolor?: boolean | undefined;
}>;
/**
 * Analyze-printability input schema — POST /openapi/v1/print/analyze. FREE.
 *
 * Provide exactly one of input_task_id / model_url. Validation happens at the
 * handler level so the exported schema stays a plain ZodObject.
 *
 * input_task_id constraints: must be a SUCCEEDED task that used Meshy 6 or any
 * Preview model. Supported task types: image-to-3d, multi-image-to-3d,
 * text-to-3d, remesh, retexture.
 */
export declare const AnalyzePrintabilityInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}, {
    response_format?: import("../constants.js").ResponseFormat | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}>;
/**
 * Repair-printability input schema — POST /openapi/v1/print/repair (10 credits).
 * Output format mirrors input format; for input_task_id the output is GLB.
 */
export declare const RepairPrintabilityInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}, {
    response_format?: import("../constants.js").ResponseFormat | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}>;
/**
 * Process-multicolor input schema — POST /openapi/v1/print/multi-color (10 credits).
 * The input model MUST have textures.
 */
export declare const ProcessMulticolorInputSchema: z.ZodObject<{
    input_task_id: z.ZodOptional<z.ZodString>;
    model_url: z.ZodOptional<z.ZodString>;
    max_colors: z.ZodDefault<z.ZodNumber>;
    max_depth: z.ZodDefault<z.ZodNumber>;
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
    max_colors: number;
    max_depth: number;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
}, {
    response_format?: import("../constants.js").ResponseFormat | undefined;
    input_task_id?: string | undefined;
    model_url?: string | undefined;
    max_colors?: number | undefined;
    max_depth?: number | undefined;
}>;
/**
 * Runtime check: exactly one of input_task_id / model_url must be present.
 * Returns null if valid, or an error message if not.
 */
export declare function validateExactlyOneSource(params: {
    input_task_id?: string;
    model_url?: string;
}): string | null;
