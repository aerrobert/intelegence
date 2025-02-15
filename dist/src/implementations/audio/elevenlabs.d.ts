import { AudioModel, AudioModelInvokeProps, AudioModelResponse } from '../../interfaces/audio';
export interface ElevenLabsAudioModelOptions {
    apiKey: string;
    modelId?: string;
    voiceId?: string;
}
export declare class ElevenLabsAudioModel extends AudioModel {
    private props;
    private static readonly DEFAULT_MODEL_ID;
    private static readonly DEFAULT_VOICE_ID;
    constructor(props: ElevenLabsAudioModelOptions);
    getName(): string;
    protected handleSpeak(input: AudioModelInvokeProps): Promise<AudioModelResponse>;
}
