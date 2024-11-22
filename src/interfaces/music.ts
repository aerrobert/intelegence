import { Logger } from '@aerrobert/logger';
import { dedent } from '../utils/dedent';

export interface MusicModelInvokeProps {
    composition: string;
    style: string;
    logger: Logger;
}

export interface MusicModelResponse {
    rawMusic: string;
}

export class MusicModel {
    public getName(): string {
        return 'unknown';
    }

    public async compose(props: MusicModelInvokeProps): Promise<MusicModelResponse> {
        props.logger.debug(`Invoking music model ${this.getName()}: ${dedent(props.composition)}`);
        const result = await this.handleCompose(props);
        return result;
    }

    protected handleCompose(props: MusicModelInvokeProps): Promise<MusicModelResponse> {
        throw new Error('Not implemented');
    }
}
