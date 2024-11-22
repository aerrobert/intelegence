import { AudioModel, AudioModelInvokeProps, AudioModelResponse } from '../../interfaces/audio';

export interface MockedAudioModelOptions {
    responses: string[];
}

export class MockedAudioModel extends AudioModel {
    constructor(private props: MockedAudioModelOptions) {
        super();
    }

    public override getName(): string {
        return 'mocked-audio';
    }

    protected override async handleSpeak(input: AudioModelInvokeProps): Promise<AudioModelResponse> {
        return {
            rawAudio: this.props.responses.shift() || '',
            alignments: {
                characters: [],
                character_end_times_seconds: [],
                character_start_times_seconds: [],
            },
        };
    }
}
