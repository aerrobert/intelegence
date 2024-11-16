import { LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
import { BestEffortJsonParser } from '../../utils/parser';
import { hash } from '../../utils/random';
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
export async function languageModelCall(props: LanguageCallProps) {
    const label = props.label || 'languageModelCall';
    const model = props.intelgence.requireLanguageModel(label);
    const callKey = hash(model.getName() + '::' + props.chat.toString());

    if (props.cache) {
        const dataStore = props.intelgence.requireLanguageDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data as string) as LanguageModelResponse;
        }
    }

    const modelResponse = await model.invoke({
        chat: props.chat,
        logger: props.intelgence.getLogger(),
    });

    if (props.cache) {
        const dataStore = props.intelgence.requireLanguageDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }

    return modelResponse;
}

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
export async function formattedLanguageModelCall<T>(props: FormattedLanguageModelCallProps) {
    const fullPrompt = `
        I am now asking you the following: 
        
        ${props.chat.toString()}

        ----

        Please respond as a valid JSON string matching this format: 
        
        ${JSON.stringify(props.formatExample, null, 2)}
        
        Match the structure provided, a valid response string might be look like: { "answer": "your answer here" }
        Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
        Add quotes around keys and values if they are strings, but not within the string itself.
        
        - good format: { "answer": "i said yes to her" }
        - bad format: { answer: "i said "yes" to her" }
    `;
    const modelResponse = await languageModelCall({
        ...props,
        chat: new ChatContext().addUserMessage(fullPrompt),
        label: 'formattedLanguageModelCall',
    });
    const jsonData = BestEffortJsonParser(modelResponse.text);
    return {
        ...modelResponse,
        parsed: jsonData as T,
    };
}
