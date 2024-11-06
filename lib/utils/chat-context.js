"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatContext = void 0;
class ChatContext {
    constructor(messages = []) {
        this.messages = messages;
    }
    static fromStrings(messages = []) {
        return new ChatContext(messages.map((message, index) => ({
            text: message,
            from: index % 2 === 0 ? 'user' : 'bot',
        })));
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
exports.ChatContext = ChatContext;
//# sourceMappingURL=chat-context.js.map