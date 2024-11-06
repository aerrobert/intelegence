"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIChatBasedLLM = void 0;
const language_1 = require("../../interfaces/language");
class OpenAIChatBasedLLM extends language_1.LanguageModel {
    constructor(props = {}) {
        super();
        this.modelId = 'gpt-4-turbo-2024-04-09';
        this.apiKey = props.apiKey || (process && process.env.OpenAI_API_KEY);
        this.modelId = props.modelId || this.modelId;
    }
    getName() {
        return 'openai-' + this.modelId;
    }
    async handleInvoke(context) {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            method: 'POST',
            body: JSON.stringify({
                model: this.modelId,
                response_format: { type: 'json_object' },
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant designed to output JSON.',
                    },
                    ...context.getMessages().map(message => ({
                        role: message.from === 'user' ? 'user' : 'assistant',
                        content: message.text,
                    })),
                ],
            }),
        });
        const responseJson = await response.json();
        return {
            text: responseJson.choices[0].message.content,
        };
    }
}
exports.OpenAIChatBasedLLM = OpenAIChatBasedLLM;
//# sourceMappingURL=openai.js.map