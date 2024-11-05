import { Invoker, InvokerProps } from '../execution/invoker';
import { Saver, SaverResult } from '../execution/saver';
import { HyperExecution } from '../framework/hyper-execution';
export interface ImageToImageGeneratorInput {
    prompt: string;
    imageUrl: string;
    strength?: number;
}
export interface ImageToImageGeneratorResult {
    base64: string;
}
export interface ImageToImageGeneratorAIInterfaceProps extends InvokerProps<SaverResult> {
    saver?: Saver<ImageToImageGeneratorResult>;
}
export declare class ImageToImageGeneratorAIInterface extends Invoker<ImageToImageGeneratorInput, SaverResult> {
    private saver;
    constructor(props: ImageToImageGeneratorAIInterfaceProps);
    protected onInvoke(input: ImageToImageGeneratorInput, execution: HyperExecution): Promise<SaverResult>;
    protected onGenerateImage(input: ImageToImageGeneratorInput): Promise<ImageToImageGeneratorResult>;
}
