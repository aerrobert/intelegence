"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIImageModel = void 0;
const image_1 = require("../../interfaces/image");
class OpenAIImageModel extends image_1.ImageModel {
    modelId = 'dall-e-3';
    apiKey;
    constructor(props = {}) {
        super();
        this.apiKey = props.apiKey || (process && process.env.OpenAI_API_KEY);
        this.modelId = props.modelId || this.modelId;
    }
    getName() {
        return 'openai-' + this.modelId;
    }
    async handleInvoke(input) {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            method: 'POST',
            body: JSON.stringify({
                model: this.modelId,
                prompt: input.prompt,
                size: '1024x1024',
                quality: 'hd',
                response_format: 'b64_json',
            }),
        });
        const responseJson = await response.json();
        if (!responseJson.data || !responseJson.data[0].b64_json) {
            throw new Error('No image generated: ' + JSON.stringify(responseJson));
        }
        return {
            imageBase64: responseJson.data[0].b64_json,
        };
    }
}
exports.OpenAIImageModel = OpenAIImageModel;
//# sourceMappingURL=openai.js.map