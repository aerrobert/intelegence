"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElevenLabsAudioModel = void 0;
const audio_1 = require("../../interfaces/audio");
class ElevenLabsAudioModel extends audio_1.AudioModel {
    props;
    static DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
    static DEFAULT_VOICE_ID = 'XB0fDUnXU5powFXDhCwa';
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return `elevenlabs-audio-${this.props.voiceId}`;
    }
    async handleSpeak(input) {
        const options = {
            method: 'POST',
            headers: {
                Accept: 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': this.props.apiKey,
            },
            body: JSON.stringify({
                text: input.script,
                model_id: this.props.modelId || ElevenLabsAudioModel.DEFAULT_MODEL_ID,
                apply_text_normalization: 'auto',
            }),
        };
        const generationRequest = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.props.voiceId || ElevenLabsAudioModel.DEFAULT_VOICE_ID}`, options);
        const id = generationRequest.headers.get('history-item-id');
        const body = await generationRequest.arrayBuffer();
        const base = new Buffer(body).toString('base64');
        const historyItem = await fetch(`https://api.elevenlabs.io/v1/history/${id}`, {
            headers: {
                'xi-api-key': this.props.apiKey,
            },
        });
        const json = await historyItem.json();
        return {
            rawAudio: base,
            alignments: json.alignments.alignment,
        };
    }
}
exports.ElevenLabsAudioModel = ElevenLabsAudioModel;
//# sourceMappingURL=elevenlabs.js.map