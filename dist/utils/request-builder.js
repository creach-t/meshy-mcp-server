/**
 * Shared API request body builder.
 */
export function buildApiRequest(requiredFields, optionalParams, excludeKeys = ["response_format"]) {
    const request = { ...requiredFields };
    const excludeSet = new Set(excludeKeys);
    for (const [key, value] of Object.entries(optionalParams)) {
        if (value !== undefined && !excludeSet.has(key)) {
            request[key] = value;
        }
    }
    return request;
}
