import { VideoModelResponse } from '../../interfaces/video';
import { Intelegence } from '../intelegence';
export interface AssignVideoModelProps {
    cache?: boolean;
    label?: string;
}
export interface VideoCallProps {
    intelgence: Intelegence;
    base64Image: string;
    prompt: string;
    cache?: boolean;
    label?: string;
}
export declare function videoModelCall(props: VideoCallProps): Promise<VideoModelResponse>;
