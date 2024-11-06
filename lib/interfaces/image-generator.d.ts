import { Invoker, InvokerProps } from '../execution/invoker';
import { Saver, SaverResult } from '../execution/saver';
import { Execution } from '../framework/execution';
export interface ImageGeneratorInput {
    prompt: string;
}
export interface ImageGeneratorResult {
    base64: string;
}
export interface ImageGeneratorAIInterfaceProps extends InvokerProps<SaverResult> {
    saver?: Saver<ImageGeneratorResult>;
}
export declare class ImageGeneratorAIInterface extends Invoker<ImageGeneratorInput, SaverResult> {
    private saver;
    constructor(props: ImageGeneratorAIInterfaceProps);
    protected onInvoke(input: ImageGeneratorInput, execution: Execution): Promise<SaverResult>;
    protected onGenerateImage(input: ImageGeneratorInput): Promise<ImageGeneratorResult>;
}
