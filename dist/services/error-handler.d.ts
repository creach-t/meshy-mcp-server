export declare function handleMeshyError(error: unknown, context?: { tool?: string }): string;
export declare function isRateLimitError(error: unknown): boolean;
export declare function isRetryableError(error: unknown): boolean;
export declare function extractErrorMessage(error: unknown): string;
