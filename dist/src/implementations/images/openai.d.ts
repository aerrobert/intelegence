import { ImageModel, ImageModelInput, ImageModelResponse } from '../../interfaces/image';
export interface OpenAIImageModelOptions {
    apiKey?: string;
    modelId?: string;
}
export declare class OpenAIImageModel extends ImageModel {
    private modelId;
    private apiKey;
    constructor(props?: OpenAIImageModelOptions);
    getName(): string;
    protected handleInvoke(input: ImageModelInput): Promise<ImageModelResponse>;
}
