import { LanguageModel, LanguageModelInvokeProps, LanguageModelProps, LanguageModelResponse } from '../../interfaces/language';
import axios from 'axios';

export interface OpenAIChatBasedLLMOptions extends LanguageModelProps {
    apiKey?: string;
    modelId?: string;
}

export class OpenAIChatBasedLLM extends LanguageModel {
    private modelId = 'gpt-4-turbo-2024-04-09';
    private apiKey: string;

    constructor(props: OpenAIChatBasedLLMOptions = {}) {
        super(props);
        this.apiKey = props.apiKey || (process && process.env.OPENAI_API_KEY) || '';
        this.modelId = props.modelId || this.modelId;
    }

    public override getName(): string {
        return 'openai-' + this.modelId;
    }

    protected override async handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse> {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: this.modelId,
                response_format: { type: 'json_object' },
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant designed to output JSON.',
                    },
                    ...props.chat.getMessages().map(message => ({
                        role: message.from === 'user' ? 'user' : 'assistant',
                        content: message.text,
                    })),
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                },
            }
        );

        return {
            response: response.data.choices[0].message.content,
        };
    }
}
