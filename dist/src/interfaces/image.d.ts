import { Logger } from '@aerrobert/logger';
export interface ImageModelInput {
    prompt: string;
    logger: Logger;
}
export interface ImageModelResponse {
    imageBase64: string;
    cachedUrl?: string;
}
export declare class ImageModel {
    getName(): string;
    generate(input: ImageModelInput): Promise<ImageModelResponse>;
    protected handleInvoke(input: ImageModelInput): Promise<ImageModelResponse>;
}
