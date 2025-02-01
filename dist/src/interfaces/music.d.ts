import { Logger } from '@aerrobert/logger';
export interface MusicModelInvokeProps {
    composition: string;
    style: string;
    logger: Logger;
}
export interface MusicModelResponse {
    rawMusic: string;
}
export declare class MusicModel {
    getName(): string;
    compose(props: MusicModelInvokeProps): Promise<MusicModelResponse>;
    protected handleCompose(props: MusicModelInvokeProps): Promise<MusicModelResponse>;
}
