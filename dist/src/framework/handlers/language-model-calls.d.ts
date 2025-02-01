import { LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
import { Intelegence } from '../intelegence';
export interface AssignLanguageModelProps {
    cache?: boolean;
    label?: string;
}
export interface LanguageCallProps {
    intelgence: Intelegence;
    chat: ChatContext;
    cache?: boolean;
    label?: string;
}
/**
 * Makes a call to a language model using the provided properties.
 * @param props - The properties required to make the language model call.
 * @param props.intelgence - The intelligence instance that manages the language model.
 * @param props.chat - The chat context to be used in the language model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the language model call. Defaults to 'languageModelCall'.
 * @returns The response from the language model, either from cache or a new invocation.
 * @throws Will throw an error if the language model or data store cannot be retrieved.
 */
export declare function languageModelCall(props: LanguageCallProps): Promise<LanguageModelResponse>;
export interface FormattedLanguageModelCallProps extends LanguageCallProps {
    formatExample: any;
}
/**
 * Makes a formatted call to a language model using the provided properties.
 * @template T - The expected type of the parsed JSON response.
 * @param props - The properties required to make the formatted language model call.
 * @param props.intelgence - The intelligence instance that manages the language model.
 * @param props.chat - The chat context to be used in the language model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the language model call. Defaults to 'formattedLanguageModelCall'.
 * @param props.formatExample - An example of the expected JSON format for the response.
 * @returns The response from the language model, including the parsed JSON data.
 * @throws Will throw an error if the language model or data store cannot be retrieved.
 */
export declare function formattedLanguageModelCall<T>(props: FormattedLanguageModelCallProps): Promise<{
    parsed: T;
    text: string;
}>;
