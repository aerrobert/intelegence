export interface ChatMessage {
    text: string;
    from: 'user' | 'bot';
}

export class ChatContext {
    constructor(private messages: ChatMessage[] = []) {}

    public static fromStrings(messages: string[] = []): ChatContext {
        return new ChatContext(
            messages.map((message, index) => ({
                text: message,
                from: index % 2 === 0 ? 'user' : 'bot',
            }))
        );
    }

    addMessage(message: ChatMessage): ChatContext {
        return new ChatContext([...this.messages, message]);
    }

    addUserMessage(text: string): ChatContext {
        return this.addMessage({
            text,
            from: 'user',
        });
    }

    addBotMessage(text: string): ChatContext {
        return this.addMessage({
            text,
            from: 'bot',
        });
    }

    getMessages(): ChatMessage[] {
        return this.messages;
    }
}
