import { HyperExecution } from './hyper-execution';
import { ChatBasedLLMInterface } from '../interfaces/chat-based-llm';
import { ImageGeneratorAIInterface } from '../interfaces/image-generator';
import { Saver } from '../execution/saver';
import { ImageToImageGeneratorAIInterface } from '../interfaces/image-to-image-generator';
import { Tasks } from './tasks';
export interface HyperProps {
    using?: {
        chatBasedLLM?: ChatBasedLLMInterface;
        imageGenerator?: ImageGeneratorAIInterface;
        imageToImageGenerator?: ImageToImageGeneratorAIInterface;
    };
    saving?: {
        executionData?: Saver<any>;
    };
    events?: {
        onTaskEvent?: (taskEvent: any) => void;
    };
}
export declare class Hyper {
    readonly chatBasedLLMInvoker: ChatBasedLLMInterface;
    readonly imageGeneratorInvoker: ImageGeneratorAIInterface;
    readonly imageToImageGeneratorInvoker: ImageToImageGeneratorAIInterface;
    readonly executionDataSaver: Saver<any>;
    readonly tasks: Tasks;
    constructor(props: HyperProps);
    begin(): HyperExecution;
}
