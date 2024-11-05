import { randomId } from "../utils/random";
export var TaskType;
(function (TaskType) {
    TaskType["start"] = "start";
    TaskType["log"] = "log";
    TaskType["error"] = "error";
    TaskType["pause"] = "pause";
    TaskType["resume"] = "resume";
    TaskType["end"] = "end";
})(TaskType || (TaskType = {}));
export class Tasks {
    constructor(props) {
        // Tasks
        this.tasks = {};
        this.onTaskEvent = props.onTaskEvent;
    }
    recordTaskEvent(taskId, type, message) {
        const task = this.tasks[taskId];
        const event = {
            id: taskId,
            type,
            message,
            relativeTime: Date.now() - task.start,
        };
        task.events.push(event);
        this.onTaskEvent(event);
    }
    startTask(name) {
        const id = randomId();
        this.tasks[id] = {
            id,
            name,
            start: Date.now(),
            events: [],
        };
        this.recordTaskEvent(id, TaskType.start, name);
        return id;
    }
    logTask(taskId, message) {
        this.recordTaskEvent(taskId, TaskType.log, message);
    }
    errorTask(taskId, message) {
        this.recordTaskEvent(taskId, TaskType.error, message);
    }
    pauseTask(taskId, timeout) {
        this.recordTaskEvent(taskId, TaskType.pause, `Delayed for ${timeout} milliseconds`);
    }
    resumeTask(taskId) {
        this.recordTaskEvent(taskId, TaskType.resume, 'Retrying execution');
    }
    endTask(taskId) {
        this.recordTaskEvent(taskId, TaskType.end, 'Completed');
    }
    getTask(taskId) {
        return this.tasks[taskId];
    }
    async runWithRetries(name, retries, fn) {
        const taskId = this.startTask(name);
        for (let i = 0; i <= retries; i++) {
            try {
                const result = await fn();
                this.endTask(taskId);
                return result;
            }
            catch (e) {
                this.errorTask(taskId, e.message);
                if (i < retries) {
                    const delayTime = 1000 * Math.pow(2, i);
                    this.pauseTask(taskId, delayTime);
                    await new Promise(resolve => setTimeout(resolve, delayTime));
                    this.resumeTask(taskId);
                }
                else {
                    this.endTask(taskId);
                    throw e;
                }
            }
        }
    }
}
