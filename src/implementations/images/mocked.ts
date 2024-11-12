import { ImageModel, ImageModelInput, ImageModelResponse } from '../../interfaces/image';

export interface MockedImageModelOptions {
    responses: string[];
}

export class MockedImageModel extends ImageModel {
    constructor(private props: MockedImageModelOptions) {
        super();
    }

    public override getName(): string {
        return 'mocked-image';
    }

    protected override async handleInvoke(input: ImageModelInput): Promise<ImageModelResponse> {
        return {
            imageBase64: this.props.responses.shift() || '',
        };
    }
}
