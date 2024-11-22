import { VideoModelResponse } from '../../interfaces/video';
import { hash } from '../../utils/random';
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

export async function videoModelCall(props: VideoCallProps): Promise<VideoModelResponse> {
    const label = props.label || 'videoModelCall';
    const videoModel = props.intelgence.requireVideoModel(label);
    const callKey = hash(videoModel.getName() + '::' + props.base64Image + '::' + props.prompt);

    if (props.cache) {
        const dataStore = props.intelgence.requireVideoDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data as string) as VideoModelResponse;
        }
    }

    const modelResponse = await videoModel.animate({
        base64Image: props.base64Image,
        prompt: props.prompt,
        logger: props.intelgence.getLogger(),
    });

    if (props.cache) {
        const dataStore = props.intelgence.requireVideoDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }

    return modelResponse;
}
