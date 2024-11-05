export declare enum TaskType {
    start = "start",
    log = "log",
    error = "error",
    pause = "pause",
    resume = "resume",
    end = "end"
}
export interface TaskEvent {
    id: string;
    type: TaskType;
    relativeTime?: number;
    message: string;
}
export interface TaskItem {
    id: string;
    name: string;
    start: number;
    events: TaskEvent[];
}
export type TaskProps = {
    onTaskEvent: (taskEvent: TaskEvent) => void;
};
export declare class Tasks {
    private tasks;
    private onTaskEvent;
    constructor(props: TaskProps);
    private recordTaskEvent;
    startTask(name: string): string;
    logTask(taskId: string, message: string): void;
    errorTask(taskId: string, message: string): void;
    pauseTask(taskId: string, timeout: number): void;
    resumeTask(taskId: string): void;
    endTask(taskId: string): void;
    getTask(taskId: string): TaskItem;
    runWithRetries(name: string, retries: number, fn: () => Promise<any>): Promise<any>;
}
