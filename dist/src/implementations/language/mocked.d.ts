import { LanguageModel, LanguageModelInvokeProps, LanguageModelResponse } from '../../interfaces/language';
export interface MockedLLMOptions {
    responses: string[];
}
export declare class MockedLLM extends LanguageModel {
    private props;
    constructor(props: MockedLLMOptions);
    getName(): string;
    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
}
