import { TaskType } from "../constants.js";
export declare const ALL_TASK_ENDPOINTS: string[];
export declare const LIST_CAPABLE_TASK_TYPES: TaskType[];
export declare function getTaskEndpoint(taskType: TaskType): string;
