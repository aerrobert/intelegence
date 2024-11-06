import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
export interface AnthropicLLMOptions {
    apiKey?: string;
    modelId?: string;
}
export declare class AnthropicLLM extends LanguageModel {
    private modelId;
    private apiKey;
    constructor(props?: AnthropicLLMOptions);
    getName(): string;
    protected handleInvoke(context: ChatContext): Promise<LanguageModelResponse>;
}
