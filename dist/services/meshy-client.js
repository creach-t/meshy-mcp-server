/**
 * Meshy API client with authentication and error handling
 */
import axios from "axios";
import { API_BASE_URL, API_TIMEOUT, RETRY_DELAYS, MAX_RETRIES } from "../constants.js";
import { isRetryableError, isRateLimitError } from "./error-handler.js";
export class MeshyClient {
    client;
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.client = axios.create({
            baseURL: API_BASE_URL,
            timeout: API_TIMEOUT,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });
        this.client.interceptors.request.use((config) => {
            config.headers.Authorization = `Bearer ${this.apiKey}`;
            return config;
        });
    }
    async get(endpoint, params) {
        return this.requestWithRetry({ method: "GET", url: endpoint, params });
    }
    async post(endpoint, data) {
        return this.requestWithRetry({ method: "POST", url: endpoint, data });
    }
    async delete(endpoint) {
        return this.requestWithRetry({ method: "DELETE", url: endpoint });
    }
    async requestWithRetry(config, retryCount = 0) {
        try {
            const response = await this.client.request(config);
            return response.data;
        }
        catch (error) {
            const shouldRetry = retryCount < MAX_RETRIES && (isRetryableError(error) || isRateLimitError(error));
            if (shouldRetry) {
                const delay = RETRY_DELAYS[retryCount] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
                console.error(`Request failed, retrying in ${delay}ms (attempt ${retryCount + 1}/${MAX_RETRIES})...`);
                await this.sleep(delay);
                return this.requestWithRetry(config, retryCount + 1);
            }
            throw error;
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async validateApiKey() {
        try {
            await this.get("/openapi/v2/text-to-3d");
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
export async function fetchTaskByIdFromKnownEndpoints(client, taskId) {
    const endpoints = [
        "/openapi/v2/text-to-3d", "/openapi/v1/image-to-3d", "/openapi/v1/multi-image-to-3d",
        "/openapi/v1/remesh", "/openapi/v1/retexture", "/openapi/v1/rigging",
        "/openapi/v1/animations", "/openapi/v1/text-to-image", "/openapi/v1/image-to-image",
        "/openapi/v1/print/multi-color"
    ];
    for (const endpoint of endpoints) {
        try {
            const task = await client.get(`${endpoint}/${taskId}`);
            if (task && task.id) return { task, endpoint };
        } catch { continue; }
    }
    return null;
}
export async function getTaskWithAutoInference(client, taskId, preferredEndpoint) {
    try {
        const task = await client.get(`${preferredEndpoint}/${taskId}`);
        if (task && task.id) return { task, endpoint: preferredEndpoint };
    } catch {}
    const result = await fetchTaskByIdFromKnownEndpoints(client, taskId);
    if (result) return result;
    throw new Error(`Task ${taskId} not found on any endpoint. Verify the task_id is correct.`);
}
export async function createMeshyClient() {
    const apiKey = process.env.MESHY_API_KEY;
    if (!apiKey) {
        throw new Error("MESHY_API_KEY environment variable is required. Get your API key from https://www.meshy.ai/settings/api");
    }
    const client = new MeshyClient(apiKey);
    console.error("Validating Meshy API key...");
    const isValid = await client.validateApiKey();
    if (!isValid) {
        throw new Error("Invalid MESHY_API_KEY. Please check your API key is correct.");
    }
    console.error("✓ Meshy API key validated successfully");
    return client;
}
