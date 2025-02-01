import { MusicModelResponse } from '../../interfaces/music';
import { Intelegence } from '../intelegence';
export interface AssignMusicModelProps {
    cache?: boolean;
    label?: string;
}
export interface MusicCallProps {
    intelgence: Intelegence;
    compose: string;
    style: string;
    cache?: boolean;
    label?: string;
}
/**
 * Makes a call to a music model using the provided properties.
 * @param props - The properties required to make the music model call.
 * @param props.intelgence - The intelligence instance that manages the music model.
 * @param props.compose - The script to provide to the music model.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the music model call. Defaults to 'musicModelCall'.
 * @returns The response from the music model, either from cache or a new invocation.
 * @throws Will throw an error if the music model or data store cannot be retrieved.
 */
export declare function musicModelCall(props: MusicCallProps): Promise<MusicModelResponse>;
