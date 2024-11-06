import { ImageGeneratorAIInterface, } from '../../interfaces/image-generator';
export class DalleImageGenerator extends ImageGeneratorAIInterface {
    constructor(props = {}) {
        super(props);
        this.modelId = 'dall-e-3';
        this.apiKey = props.apiKey || (process && process.env.OPENAI_API_KEY);
        this.modelId = props.modelId || this.modelId;
    }
    getName() {
        return 'dalle-' + this.modelId;
    }
    async onGenerateImage(input) {
        const completion = await fetch('https://api.openai.com/v1/images/generations', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.apiKey,
            },
            method: 'POST',
            body: JSON.stringify({
                model: this.modelId,
                prompt: input.prompt,
                quality: 'hd',
                response_format: 'b64_json',
                size: '1024x1024',
            })
        });
        const completionJson = await completion.json();
        return {
            base64: completionJson.data[0].b64_json,
        };
    }
}
//# sourceMappingURL=dalle.js.map