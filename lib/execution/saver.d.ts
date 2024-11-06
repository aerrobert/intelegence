import { Execution } from '../framework/execution';
export interface SaverResult {
    raw?: any;
    accessUrl: string;
}
export declare class Saver<SaverInput> {
    save(name: string, data: SaverInput, execution: Execution): Promise<SaverResult>;
    protected saveRaw(_: SaverInput): Promise<SaverResult>;
}
