import { ImageModelResponse } from '../../interfaces/image';
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
export declare function imageModelCall(props: ImageCallProps): Promise<ImageModelResponse>;
