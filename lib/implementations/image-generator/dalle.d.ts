import { ImageGeneratorAIInterface, ImageGeneratorAIInterfaceProps, ImageGeneratorInput, ImageGeneratorResult } from '../../interfaces/image-generator';
export interface DalleImageGeneratorInput extends ImageGeneratorAIInterfaceProps {
    apiKey?: string;
    modelId?: string;
}
export declare class DalleImageGenerator extends ImageGeneratorAIInterface {
    private modelId;
    private apiKey;
    constructor(props?: DalleImageGeneratorInput);
    protected getName(): string;
    protected onGenerateImage(input: ImageGeneratorInput): Promise<ImageGeneratorResult>;
}
