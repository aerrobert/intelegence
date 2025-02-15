export interface ChatMessage {
    text: string;
    from: 'user' | 'bot';
}
export declare class ChatContext {
    private messages;
    constructor(messages?: ChatMessage[]);
    static fromStrings(messages?: string[]): ChatContext;
    addMessage(message: ChatMessage): ChatContext;
    addUserMessage(text: string): ChatContext;
    addBotMessage(text: string): ChatContext;
    getMessages(): ChatMessage[];
    toString(): string;
}
