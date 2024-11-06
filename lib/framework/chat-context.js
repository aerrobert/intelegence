export class ChatContext {
    constructor(messages) {
        this.messages = messages;
    }
    addMessage(message) {
        return new ChatContext([...this.messages, message]);
    }
    addUserMessage(text) {
        return this.addMessage({
            text,
            from: 'user',
        });
    }
    addBotMessage(text) {
        return this.addMessage({
            text,
            from: 'bot',
        });
    }
    getMessages() {
        return this.messages;
    }
}
//# sourceMappingURL=chat-context.js.map