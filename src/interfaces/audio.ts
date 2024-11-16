import { Logger } from '@aerrobert/logger';
import { dedent } from '../utils/dedent';

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

export class AudioModel {
    public getName(): string {
        return 'unknown';
    }

    public async speak(props: AudioModelInvokeProps): Promise<AudioModelResponse> {
        props.logger.debug(`Invoking audio model ${this.getName()}: ${dedent(props.script)}`);
        const result = await this.handleInvoke(props);
        return result;
    }

    protected handleInvoke(props: AudioModelInvokeProps): Promise<AudioModelResponse> {
        throw new Error('Not implemented');
    }
}
