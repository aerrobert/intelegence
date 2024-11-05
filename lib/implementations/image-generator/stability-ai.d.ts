import { ImageGeneratorAIInterface, ImageGeneratorAIInterfaceProps, ImageGeneratorInput, ImageGeneratorResult } from '../../interfaces/image-generator';
export interface StabilityAIGeneratorInput extends ImageGeneratorAIInterfaceProps {
    apiKey?: string;
    engineId?: string;
}
export declare class StabilityAiImageGenerator extends ImageGeneratorAIInterface {
    private apiKey;
    private engineId;
    constructor(props?: StabilityAIGeneratorInput);
    protected getName(): string;
    protected onGenerateImage(input: ImageGeneratorInput): Promise<ImageGeneratorResult>;
}
