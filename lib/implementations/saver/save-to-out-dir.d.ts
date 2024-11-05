import { Saver, SaverResult } from '../../execution/saver';
import { ExecutionResult } from '../../framework/hyper-execution';
export declare class SaveToOutputDirectory extends Saver<ExecutionResult> {
    private outputDir;
    constructor(outputDir: string);
    private moveLocalPathToOutPath;
    private saveRawToOutPath;
    protected saveRaw(value: ExecutionResult): Promise<SaverResult>;
}
