import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';

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

    protected override async handleInvoke(context: ChatContext): Promise<LanguageModelResponse> {
        const command = new ConverseCommand({
            modelId: this.modelId,
            messages: context.getMessages().map(message => ({
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
