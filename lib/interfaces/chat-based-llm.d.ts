import { Invoker } from '../execution/invoker';
import { ChatContext } from '../framework/chat-context';
export interface LLMChatResponse {
    text: string;
}
export declare class ChatBasedLLMInterface extends Invoker<ChatContext, LLMChatResponse> {
    protected onInvoke(input: ChatContext): Promise<LLMChatResponse>;
    protected onLLMInvoke(input: ChatContext): Promise<LLMChatResponse>;
}
