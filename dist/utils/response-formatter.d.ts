import { ResponseFormat } from "../constants.js";
export interface TaskCreatedOutput {
    [x: string]: unknown;
    task_id: string;
    status: string;
    message: string;
    estimated_time: string;
}
export declare function formatTaskCreatedResponse(output: TaskCreatedOutput, responseFormat: ResponseFormat, title: string, body: string, nextStepHint?: string): { content: { type: "text"; text: string }[]; structuredContent: TaskCreatedOutput };
