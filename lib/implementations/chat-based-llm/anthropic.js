import { ChatBasedLLMInterface } from '../../interfaces/chat-based-llm';
import { NoCache } from '../cache/no-cache';
export class AnthropicChatBasedLLM extends ChatBasedLLMInterface {
    constructor(props = {}) {
        super(Object.assign({ cache: new NoCache() }, props));
        this.modelId = 'claude-3-opus-20240229';
        this.apiKey = props.apiKey || (process && process.env.ANTHROPIC_API_KEY),
            this.modelId = props.modelId || this.modelId;
    }
    getName() {
        return 'anthropic-' + this.modelId;
    }
    async onLLMInvoke(context) {
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
            })
        });
        const responseJson = await response.json();
        return {
            text: responseJson.content[0].text,
        };
    }
}
