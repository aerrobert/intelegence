"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiMusicPro = void 0;
const music_1 = require("../../interfaces/music");
class AiMusicPro extends music_1.MusicModel {
    props;
    static DEFAULT_MODEL_ID = 'udio-32';
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return `aimusicpro-${this.props.modelId || AiMusicPro.DEFAULT_MODEL_ID}`;
    }
    async handleCompose(input) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'song-title',
                prompt: input.composition,
                gpt_description_prompt: input.style,
                make_instrumental: true,
                custom_mode: false,
                model: this.props.modelId || AiMusicPro.DEFAULT_MODEL_ID,
                disable_callback: true,
                token: this.props.apiKey,
            }),
        };
        const generationRequest = await fetch(`https://udioapi.pro/api/generate`, options);
        const body = await generationRequest.json();
        const id = body['workId'];
        let tries = 0;
        while (true) {
            const generationResponse = await fetch(`https://udioapi.pro/api/feed?workId=${id}`);
            const generationBody = await generationResponse.json();
            if (generationBody.response_data?.[0]?.audio_url) {
                const mp3Url = generationBody.response_data[0].audio_url;
                input.logger.log('Music generation complete!');
                const data = await fetch(mp3Url);
                const rawMusic = await data.arrayBuffer();
                const base = new Buffer(rawMusic).toString('base64');
                return {
                    rawMusic: base,
                };
            }
            if (generationBody.type === 'failed') {
                input.logger.logError(`Music generation failed: ${JSON.stringify(generationBody)}`);
                throw new Error(generationBody.message);
            }
            input.logger.debug(`Waiting for music generation to complete... (https://udioapi.pro/api/feed?workId=${id})`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            if (tries > 50) {
                input.logger.logError('Music generation timed out.');
                throw new Error('Music generation timed out.');
            }
            tries++;
        }
    }
}
exports.AiMusicPro = AiMusicPro;
//# sourceMappingURL=aiMusicPro.js.map