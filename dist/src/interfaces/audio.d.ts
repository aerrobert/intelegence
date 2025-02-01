import { Logger } from '@aerrobert/logger';
export interface AudioModelInvokeProps {
    script: string;
    logger: Logger;
}
export interface AudioModelResponse {
    rawAudio: string;
    alignments: {
        characters: string[];
        character_start_times_seconds: number[];
        character_end_times_seconds: number[];
    };
}
export declare class AudioModel {
    getName(): string;
    speak(props: AudioModelInvokeProps): Promise<AudioModelResponse>;
    protected handleSpeak(props: AudioModelInvokeProps): Promise<AudioModelResponse>;
}
