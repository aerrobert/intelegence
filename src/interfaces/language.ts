import { ChatContext } from '../utils/chat-context';

export interface LanguageModelResponse {
    text: string;
}

export class LanguageModel {
    public getName(): string {
        return 'unknown';
    }

    public invoke(input: ChatContext): Promise<LanguageModelResponse> {
        return this.handleInvoke(input);
    }

    protected handleInvoke(input: ChatContext): Promise<LanguageModelResponse> {
        throw new Error('Not implemented');
    }
}
