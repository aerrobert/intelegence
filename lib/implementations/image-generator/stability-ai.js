import { ImageGeneratorAIInterface } from '../../interfaces/image-generator';
export class StabilityAiImageGenerator extends ImageGeneratorAIInterface {
    constructor(props = {}) {
        super(props);
        this.engineId = 'stable-diffusion-xl-1024-v1-0';
        this.apiKey = props.apiKey || (process && process.env.STABILITY_AI_API_KEY);
        this.engineId = props.engineId || this.engineId;
    }
    getName() {
        return 'stable-diffusion-' + this.engineId;
    }
    async onGenerateImage(input) {
        const response = await fetch(`https://api.stability.ai/v1/generation/${this.engineId}/text-to-image`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                text_prompts: [
                    {
                        text: input.prompt,
                    },
                ],
                cfg_scale: 7,
                height: 1024,
                width: 1024,
                steps: 30,
                samples: 1,
            }),
        });
        const body = await response.json();
        return {
            base64: body.artifacts[0].base64,
        };
    }
}
//# sourceMappingURL=stability-ai.js.map