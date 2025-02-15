"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedrockLLM = void 0;
const client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
const language_1 = require("../../interfaces/language");
class BedrockLLM extends language_1.LanguageModel {
    client;
    modelId;
    region;
    constructor(props = {}) {
        super();
        this.modelId = props.modelId || 'anthropic.claude-v2';
        this.region = props.region || 'us-west-2';
        this.client = new client_bedrock_runtime_1.BedrockRuntimeClient({
            region: this.region,
        });
    }
    getName() {
        return 'bedrock-' + this.modelId;
    }
    async handleInvoke(props) {
        const command = new client_bedrock_runtime_1.ConverseCommand({
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
            text: response.output.message.content[0].text || '',
        };
    }
}
exports.BedrockLLM = BedrockLLM;
//# sourceMappingURL=bedrock.js.map