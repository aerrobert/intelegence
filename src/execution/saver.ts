import { Execution } from '../framework/execution';

export interface SaverResult {
    raw?: any;
    accessUrl: string;
}

export class Saver<SaverInput> {
    public async save(name: string, data: SaverInput, execution: Execution): Promise<SaverResult> {
        execution.tasks.logTask(execution.rootTask, `Saving ${name}`);
        return this.saveRaw(data);
    }

    protected saveRaw(_: SaverInput): Promise<SaverResult> {
        throw new Error('Not implemented');
    }
}
