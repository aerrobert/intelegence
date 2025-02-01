import { VideoModel, VideoModelInvokeProps, VideoModelResponse } from '../../interfaces/video';
export interface RunwayOptions {
    apiKey: string;
}
export declare class RunwayVideo extends VideoModel {
    private client;
    constructor(props: RunwayOptions);
    getName(): string;
    protected handleAnimate(input: VideoModelInvokeProps): Promise<VideoModelResponse>;
}
