import { Logger } from '@aerrobert/logger';
import { ChatContext } from '../utils/chat-context';
export interface LanguageModelInvokeProps {
    chat: ChatContext;
    logger: Logger;
}
export interface LanguageModelResponse {
    text: string;
}
export declare class LanguageModel {
    getName(): string;
    invoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse>;
}
