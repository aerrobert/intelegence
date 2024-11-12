import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { DataStorage } from '../interfaces/storage';
import { ChatContext } from '../utils/chat-context';
import { BestEffortJsonParser } from '../utils/parser';

export interface IntelegenceProps {
    language?: LanguageModel;
    image?: ImageModel;
    dataStore?: DataStorage;
}

export class Intelegence {
    private readonly languageModel: LanguageModel | undefined;
    private readonly imageModel: ImageModel | undefined;
    private readonly dataStore: DataStorage | undefined;

    constructor(props: IntelegenceProps) {
        this.languageModel = props.language;
        this.imageModel = props.image;
        this.dataStore = props.dataStore;
    }

    /**
     * Utilities
     */
    private requireLanguageModel(): LanguageModel {
        if (!this.languageModel) {
            throw new Error('No language model provided');
        }
        return this.languageModel;
    }

    private requireImageModel(): ImageModel {
        if (!this.imageModel) {
            throw new Error('No image model provided');
        }
        return this.imageModel;
    }

    private requireDataStore(): DataStorage {
        if (!this.dataStore) {
            throw new Error('No data store provided');
        }
        return this.dataStore;
    }

    /**
     * Language model interfaces
     */

    public async languageAsk(question: string) {
        const model = this.requireLanguageModel();
        const modelResponse = await model.invoke(new ChatContext().addUserMessage(question));
        return modelResponse.text;
    }

    public async languageAskWithFormat({ chat, question, format }: { chat: string[] | undefined; question: string; format: string }) {
        const model = this.requireLanguageModel();
        const fullPrompt = `
            I am now asking you the following: 
            
            ${prompt}

            ----

            Please respond as a valid JSON string matching this format: ${JSON.stringify(format)}. 
            
            Match the structure provided, a valid response string might be look like: { "answer": "your answer here" }
            Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
            Add quotes around keys and values if they are strings, but not within the string itself.
            
            - good format: { "answer": "i said yes to her" }
            - bad format: { answer: "i said "yes" to her" }
        `;
        const chatHistory = ChatContext.fromStrings(chat);
        const modelResponse = await model.invoke(chatHistory.addUserMessage(fullPrompt));
        return BestEffortJsonParser(modelResponse.text);
    }

    public async languageAskForObjectDelta({ chat, question, object }: { chat: string[] | undefined; question: string; object: any }) {
        const model = this.requireLanguageModel();
        const fullPrompt = `

            You have the following object:

            ${JSON.stringify(object)}

            I am now asking you to make the following edits to it:
            
            ${question}

            ----

            Please respond as a valid PARTIAL JSON string which will be merged into the object.
            Only change fields that you want to update, and leave the rest out.

            For example, if the original object is { "name": "John", "age": 30 } and I ask you to change the name to "Jane", you would respond with { "name": "Jane" }.
            You can change multiple fields at once, but only the fields you want to change.

            Additionally, your response should be a valid JSON string, and avoid any characters that may break the JSON format, like double quotes within double quotes.
            - good format: { "name": "Jane" }
            - bad format: { name: "Jane" }
            
        `;
        const chatHistory = ChatContext.fromStrings(chat);
        const modelResponse = await model.invoke(chatHistory.addUserMessage(fullPrompt));
        return BestEffortJsonParser(modelResponse.text);
    }

    /**
     * Image model interfaces
     */

    public async imageGenerate(prompt: string) {
        const model = this.requireImageModel();
        const modelResponse = await model.generate({ prompt });
        return modelResponse.imageBase64;
    }

    public async imageGenerateAndSaveInDataStore(id: string, prompt: string) {
        const model = this.requireImageModel();
        const dataStore = this.requireDataStore();
        const modelResponse = await model.generate({ prompt });
        const buffer = Buffer.from(modelResponse.imageBase64, 'base64');
        await dataStore.set({
            key: `${id}.png`,
            value: buffer,
        });
        return modelResponse.imageBase64;
    }
}
