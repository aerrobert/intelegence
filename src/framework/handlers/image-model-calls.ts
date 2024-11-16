import { ImageModelResponse } from '../../interfaces/image';
import { hash } from '../../utils/random';
import { Intelegence } from '../intelegence';

export interface AssignImageModelProps {
    cache?: boolean;
    label?: string;
}

export interface ImageCallProps {
    intelgence: Intelegence;
    prompt: string;
    cache?: boolean;
    label?: string;
}

/**
 * Makes a call to an image model using the provided properties.
 * @param props - The properties required to make the image model call.
 * @param props.intelgence - The intelligence instance that manages the image model.
 * @param props.prompt - The prompt to be used in the image model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the image model call. Defaults to 'imageModelCall'.
 * @returns The response from the image model, either from cache or a new invocation.
 * @throws Will throw an error if the image model or data store cannot be retrieved.
 */
export async function imageModelCall(props: ImageCallProps) {
    const label = props.label || 'imageModelCall';
    const model = props.intelgence.requireImageModel(label);
    const callKey = hash(model.getName() + '::' + props.prompt);

    if (props.cache) {
        const dataStore = props.intelgence.requireImageDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data as string) as ImageModelResponse;
        }
    }

    const modelResponse = await model.generate({
        prompt: props.prompt,
        logger: props.intelgence.getLogger(),
    });

    if (props.cache) {
        const dataStore = props.intelgence.requireImageDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }

    return modelResponse;
}
