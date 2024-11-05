import { ImageToImageGeneratorAIInterface, ImageToImageGeneratorAIInterfaceProps, ImageToImageGeneratorInput, ImageToImageGeneratorResult } from '../../interfaces/image-to-image-generator';
export interface StabilityImageToImageAIGeneratorInput extends ImageToImageGeneratorAIInterfaceProps {
    apiKey?: string;
    engineId?: string;
}
export declare class StabilityImageToImageAiImageGenerator extends ImageToImageGeneratorAIInterface {
    private apiKey;
    private engineId;
    constructor(props?: StabilityImageToImageAIGeneratorInput);
    protected getName(): string;
    protected onGenerateImage(input: ImageToImageGeneratorInput): Promise<ImageToImageGeneratorResult>;
}
