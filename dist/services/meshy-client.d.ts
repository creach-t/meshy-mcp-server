export declare class MeshyClient {
    private client;
    private apiKey;
    constructor(apiKey: string);
    get(endpoint: string, params?: Record<string, unknown>): Promise<any>;
    post(endpoint: string, data?: unknown): Promise<any>;
    delete(endpoint: string): Promise<any>;
    private requestWithRetry;
    private sleep;
    validateApiKey(): Promise<boolean>;
}
export declare function fetchTaskByIdFromKnownEndpoints(client: MeshyClient, taskId: string): Promise<{ task: any; endpoint: string } | null>;
export declare function getTaskWithAutoInference(client: MeshyClient, taskId: string, preferredEndpoint: string): Promise<{ task: any; endpoint: string }>;
export declare function createMeshyClient(): Promise<MeshyClient>;
