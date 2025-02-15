import { AudioModel, AudioModelInvokeProps, AudioModelResponse } from '../../interfaces/audio';
export interface MockedAudioModelOptions {
    responses: string[];
}
export declare class MockedAudioModel extends AudioModel {
    private props;
    constructor(props: MockedAudioModelOptions);
    getName(): string;
    protected handleSpeak(input: AudioModelInvokeProps): Promise<AudioModelResponse>;
}
