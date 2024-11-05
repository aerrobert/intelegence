import { ChatBasedLLMInterface, LLMChatResponse } from '../../interfaces/chat-based-llm';
import { InvokerProps } from '../../execution/invoker';
import { ChatContext } from '../../framework/chat-context';
export interface OpenAIChatBasedLLMOptions extends InvokerProps<LLMChatResponse> {
    apiKey?: string;
    modelId?: string;
}
export declare class OpenAIChatBasedLLM extends ChatBasedLLMInterface {
    private modelId;
    private apiKey;
    constructor(props?: OpenAIChatBasedLLMOptions);
    protected getName(): string;
    protected onLLMInvoke(context: ChatContext): Promise<LLMChatResponse>;
}
