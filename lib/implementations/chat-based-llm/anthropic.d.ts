import { ChatBasedLLMInterface, LLMChatResponse } from '../../interfaces/chat-based-llm';
import { InvokerProps } from '../../execution/invoker';
import { ChatContext } from '../../framework/chat-context';
export interface AnthropicChatBasedLLMOptions extends InvokerProps<LLMChatResponse> {
    apiKey?: string;
    modelId?: string;
}
export declare class AnthropicChatBasedLLM extends ChatBasedLLMInterface {
    private modelId;
    private apiKey;
    constructor(props?: AnthropicChatBasedLLMOptions);
    protected getName(): string;
    protected onLLMInvoke(context: ChatContext): Promise<LLMChatResponse>;
}
