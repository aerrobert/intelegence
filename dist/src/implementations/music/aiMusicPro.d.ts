import { MusicModel, MusicModelInvokeProps, MusicModelResponse } from '../../interfaces/music';
export interface AiMusicProOptions {
    apiKey: string;
    modelId?: string;
}
export declare class AiMusicPro extends MusicModel {
    private props;
    private static readonly DEFAULT_MODEL_ID;
    constructor(props: AiMusicProOptions);
    getName(): string;
    protected handleCompose(input: MusicModelInvokeProps): Promise<MusicModelResponse>;
}
