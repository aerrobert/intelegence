import { LanguageModel, LanguageModelInvokeProps, LanguageModelResponse } from '../../interfaces/language';
export interface BedrockLLMOptions {
    modelId?: string;
    region?: string;
    apiKey?: string;
}
export declare class BedrockLLM extends LanguageModel {
    private client;
    private modelId;
    private region;
    constructor(props?: BedrockLLMOptions);
    getName(): string;
    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
}
