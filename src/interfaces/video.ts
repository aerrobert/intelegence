import { Logger } from '@aerrobert/logger';
import { dedent } from '../utils/dedent';

export interface VideoModelInvokeProps {
    base64Image: string;
    prompt: string;
    logger: Logger;
}

export interface VideoModelResponse {
    base64Video: string;
}

export class VideoModel {
    public getName(): string {
        return 'unknown';
    }

    public async animate(props: VideoModelInvokeProps): Promise<VideoModelResponse> {
        props.logger.debug(`Invoking video model ${this.getName()}: ${dedent(props.prompt)}`);
        const result = await this.handleAnimate(props);
        return result;
    }

    protected handleAnimate(props: VideoModelInvokeProps): Promise<VideoModelResponse> {
        throw new Error('Not implemented');
    }
}
