import { HyperExecution } from "../framework/hyper-execution";
export interface SaverResult {
    raw?: any;
    accessUrl: string;
}
export declare class Saver<SaverInput> {
    save(name: string, data: SaverInput, execution: HyperExecution): Promise<SaverResult>;
    protected saveRaw(_: SaverInput): Promise<SaverResult>;
}
