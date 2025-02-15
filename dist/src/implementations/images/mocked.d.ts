import { ImageModel, ImageModelInput, ImageModelResponse } from '../../interfaces/image';
export interface MockedImageModelOptions {
    responses: string[];
}
export declare class MockedImageModel extends ImageModel {
    private props;
    constructor(props: MockedImageModelOptions);
    getName(): string;
    protected handleInvoke(input: ImageModelInput): Promise<ImageModelResponse>;
}
