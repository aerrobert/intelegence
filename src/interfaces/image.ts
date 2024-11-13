import { Logger } from '@aerrobert/logger';

export interface ImageModelInput {
    prompt: string;
    logger: Logger;
}

export interface ImageModelResponse {
    imageBase64: string;
}

export class ImageModel {
    public getName(): string {
        return 'unknown';
    }

    public generate(input: ImageModelInput): Promise<ImageModelResponse> {
        input.logger.log(`Generating image for prompt: '${input.prompt}'`);
        return this.handleInvoke(input);
    }

    protected handleInvoke(input: ImageModelInput): Promise<ImageModelResponse> {
        throw new Error('Not implemented');
    }
}
