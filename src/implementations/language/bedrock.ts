import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { LanguageModel, LanguageModelInvokeProps, LanguageModelResponse } from '../../interfaces/language';

export interface BedrockLLMOptions {
    modelId?: string;
    region?: string;
    apiKey?: string;
}

export class BedrockLLM extends LanguageModel {
    private client: BedrockRuntimeClient;
    private modelId: string;
    private region: string;

    constructor(props: BedrockLLMOptions = {}) {
        super();
        this.modelId = props.modelId || 'anthropic.claude-v2';
        this.region = props.region || 'us-west-2';
        this.client = new BedrockRuntimeClient({
            region: this.region,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
        });
    }

    public override getName(): string {
        return 'bedrock-' + this.modelId;
    }

    protected override async handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse> {
        const command = new ConverseCommand({
            modelId: this.modelId,
            messages: props.chat.getMessages().map(message => ({
                role: message.from === 'user' ? 'user' : 'assistant',
                content: [
                    {
                        text: message.text,
                    },
                ],
            })),
        });
        const response = await this.client.send(command);
        return {
            text: response.output!.message!.content![0]!.text || '',
        };
    }
}
