export declare function resolveProjectDir(taskId: string, taskType: string, prompt?: string, parentTaskId?: string, createdAt?: number): string;
export declare function getFilePath(projectDir: string, stage: string, format: string): string;
export declare function getTextureFilePath(projectDir: string, stage: string, texType: string, texUrl: string): string;
export declare function inferStage(taskType: string, responseType?: string): string;
export declare function recordTask(projectDir: string, record: Record<string, unknown>): void;
export declare function saveThumbnail(projectDir: string, thumbnailUrl: string): Promise<void>;
