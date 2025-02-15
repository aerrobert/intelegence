import { LanguageModel, LanguageModelInvokeProps, LanguageModelResponse } from '../../interfaces/language';
export interface AnthropicLLMOptions {
    apiKey?: string;
    modelId?: string;
}
export declare class AnthropicLLM extends LanguageModel {
    private modelId;
    private apiKey;
    constructor(props?: AnthropicLLMOptions);
    getName(): string;
    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
}
