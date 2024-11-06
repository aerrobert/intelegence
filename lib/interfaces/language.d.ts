import { ChatContext } from '../utils/chat-context';
export interface LanguageModelResponse {
    text: string;
}
export declare class LanguageModel {
    getName(): string;
    invoke(input: ChatContext): Promise<LanguageModelResponse>;
    protected handleInvoke(input: ChatContext): Promise<LanguageModelResponse>;
}
