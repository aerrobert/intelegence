import { Saver, SaverResult } from '../../execution/saver';
import { ExecutionResult } from '../../framework/execution';
export declare class SaveExecutionToS3 extends Saver<ExecutionResult> {
    private bucket;
    private S3Client;
    constructor(bucket: string);
    private uploadLocalPathToRemote;
    private uploadRawStringToRemote;
    private buildUrlForPath;
    protected saveRaw(value: ExecutionResult): Promise<SaverResult>;
}
