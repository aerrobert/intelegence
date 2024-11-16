import { AudioModelResponse } from '../../interfaces/audio';
import { hash } from '../../utils/random';
import { Intelegence } from '../intelegence';

export interface AssignAudioModelProps {
    cache?: boolean;
    label?: string;
}

export interface AudioCallProps {
    intelgence: Intelegence;
    script: string;
    cache?: boolean;
    label?: string;
}

/**
 * Makes a call to an audio model using the provided properties.
 * @param props - The properties required to make the audio model call.
 * @param props.intelgence - The intelligence instance that manages the audio model.
 * @param props.script - The script to provide to the audio model.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the audio model call. Defaults to 'audioModelCall'.
 * @returns The response from the audio model, either from cache or a new invocation.
 * @throws Will throw an error if the audio model or data store cannot be retrieved.
 */
export async function audioModelCall(props: AudioCallProps) {
    const label = props.label || 'audioModelCall';
    const model = props.intelgence.requireAudioModel(label);
    const callKey = hash(model.getName() + '::' + props.script);

    if (props.cache) {
        const dataStore = props.intelgence.requireAudioDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data as string) as AudioModelResponse;
        }
    }

    const modelResponse = await model.speak({
        script: props.script,
        logger: props.intelgence.getLogger(),
    });

    if (props.cache) {
        const dataStore = props.intelgence.requireAudioDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }

    return modelResponse;
}
