import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
export interface OpenAIChatBasedLLMOptions {
    apiKey?: string;
    modelId?: string;
}
export declare class OpenAIChatBasedLLM extends LanguageModel {
    private modelId;
    private apiKey;
    constructor(props?: OpenAIChatBasedLLMOptions);
    getName(): string;
    protected handleInvoke(context: ChatContext): Promise<LanguageModelResponse>;
}
