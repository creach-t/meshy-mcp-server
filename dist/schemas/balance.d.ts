/**
 * Zod schema for balance tool
 */
import { z } from "zod";
export declare const CheckBalanceInputSchema: z.ZodObject<{
    response_format: z.ZodDefault<z.ZodNativeEnum<typeof import("../constants.js").ResponseFormat>>;
}, "strict", z.ZodTypeAny, {
    response_format: import("../constants.js").ResponseFormat;
}, {
    response_format?: import("../constants.js").ResponseFormat | undefined;
}>;
