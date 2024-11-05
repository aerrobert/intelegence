import { Saver, SaverResult } from '../../execution/saver';
export declare class SaveExecutionDataInBrowser extends Saver<any> {
    private prefix;
    constructor(prefix: string);
    protected saveRaw(value: any): Promise<SaverResult>;
}
