import { hash } from '../utils/random';
import { NoCache } from '../implementations/cache/no-cache';
export class Invoker {
    constructor(props = {}) {
        this.cache = props.cache || new NoCache();
    }
    getName() {
        throw new Error('Not implemented');
    }
    async invoke(input, execution) {
        const key = hash(this.getName() + JSON.stringify(input));
        const exists = await this.cache.exists(key);
        if (exists) {
            execution.tasks.logTask(execution.rootTask, `Cache hit for invoke of '${this.getName()}'`);
            return await this.cache.get(key);
        }
        else {
            const result = await execution.tasks.runWithRetries(`Invoke of '${this.getName()}'`, 5, () => this.onInvoke(input, execution));
            await this.cache.set(key, result);
            return result;
        }
    }
    onInvoke(input, execution) {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=invoker.js.map