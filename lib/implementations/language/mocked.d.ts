import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
export interface MockedLLMOptions {
    responses: string[];
}
export declare class MockedLLM extends LanguageModel {
    private props;
    constructor(props: MockedLLMOptions);
    getName(): string;
    protected handleInvoke(context: ChatContext): Promise<LanguageModelResponse>;
}
