export interface ImageModelInput {
    prompt: string;
}

export interface ImageModelResponse {
    imageBase64: string;
}

export class ImageModel {
    public getName(): string {
        return 'unknown';
    }

    public generate(input: ImageModelInput): Promise<ImageModelResponse> {
        return this.handleInvoke(input);
    }

    protected handleInvoke(input: ImageModelInput): Promise<ImageModelResponse> {
        throw new Error('Not implemented');
    }
}
