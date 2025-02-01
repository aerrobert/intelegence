import { LanguageModel, LanguageModelInvokeProps, LanguageModelResponse } from '../../interfaces/language';
export interface OpenAIChatBasedLLMOptions {
    apiKey?: string;
    modelId?: string;
}
export declare class OpenAIChatBasedLLM extends LanguageModel {
    private modelId;
    private apiKey;
    constructor(props?: OpenAIChatBasedLLMOptions);
    getName(): string;
    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
}
