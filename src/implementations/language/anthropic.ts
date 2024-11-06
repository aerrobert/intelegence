import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';

export interface AnthropicLLMOptions {
    apiKey?: string;
    modelId?: string;
}

export class AnthropicLLM extends LanguageModel {
    private modelId = 'claude-3-opus-20240229';
    private apiKey: string;

    constructor(props: AnthropicLLMOptions = {}) {
        super();
        this.apiKey = props.apiKey || (process && process.env.ANTHROPIC_API_KEY!);
        this.modelId = props.modelId || this.modelId;
    }

    public override getName(): string {
        return 'anthropic-' + this.modelId;
    }

    protected override async handleInvoke(context: ChatContext): Promise<LanguageModelResponse> {
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
