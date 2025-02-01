import { Logger } from '@aerrobert/logger';
export interface VideoModelInvokeProps {
    base64Image: string;
    prompt: string;
    logger: Logger;
}
export interface VideoModelResponse {
    base64Video: string;
}
export declare class VideoModel {
    getName(): string;
    animate(props: VideoModelInvokeProps): Promise<VideoModelResponse>;
    protected handleAnimate(props: VideoModelInvokeProps): Promise<VideoModelResponse>;
}
