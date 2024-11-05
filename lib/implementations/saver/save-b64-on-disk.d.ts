import { Saver, SaverResult } from '../../execution/saver';
import { ImageGeneratorResult } from '../../interfaces/image-generator';
export declare class SaveBase64ImgOnDisk extends Saver<ImageGeneratorResult> {
    private prefix;
    constructor(prefix: string);
    protected saveRaw(value: ImageGeneratorResult): Promise<SaverResult>;
}
