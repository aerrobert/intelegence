import { AudioModel, AudioModelInvokeProps, AudioModelResponse } from '../../interfaces/audio';

export interface ElevenLabsAudioModelOptions {
    apiKey: string;
    modelId?: string;
    voiceId?: string;
}

export class ElevenLabsAudioModel extends AudioModel {
    private static readonly DEFAULT_MODEL_ID = 'eleven_multilingual_v2';
    private static readonly DEFAULT_VOICE_ID = 'XB0fDUnXU5powFXDhCwa';

    constructor(private props: ElevenLabsAudioModelOptions) {
        super();
    }

    public override getName(): string {
        return `elevenlabs-audio-${this.props.voiceId}`;
    }

    protected override async handleSpeak(input: AudioModelInvokeProps): Promise<AudioModelResponse> {
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

        const generationRequest = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${this.props.voiceId || ElevenLabsAudioModel.DEFAULT_VOICE_ID}`,
            options
        );
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
