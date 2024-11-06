"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicLLM = void 0;
const language_1 = require("../../interfaces/language");
class AnthropicLLM extends language_1.LanguageModel {
    constructor(props = {}) {
        super();
        this.modelId = 'claude-3-opus-20240229';
        this.apiKey = props.apiKey || (process && process.env.ANTHROPIC_API_KEY);
        this.modelId = props.modelId || this.modelId;
    }
    getName() {
        return 'anthropic-' + this.modelId;
    }
    async handleInvoke(context) {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': this.apiKey,
                'anthropic-version': '2023-06-01',
            },
            method: 'POST',
            body: JSON.stringify({
                model: this.modelId,
                messages: context.getMessages().map(message => ({
                    role: message.from === 'user' ? 'user' : 'assistant',
                    content: message.text,
                })),
                max_tokens: 3000,
            }),
        });
        const responseJson = await response.json();
        return {
            text: responseJson.content[0].text,
        };
    }
}
exports.AnthropicLLM = AnthropicLLM;
//# sourceMappingURL=anthropic.js.map