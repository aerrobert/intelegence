import { Logger } from '@aerrobert/logger';
import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { DataStorage } from '../interfaces/storage';
import { ChatContext } from '../utils/chat-context';
import { BestEffortJsonParser } from '../utils/parser';
import { hash } from '../utils/random';

export interface IntelegenceProps {
    language?: LanguageModel;
    image?: ImageModel;
    storage?: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
    };
    logger?: Logger;
}

export class Intelegence {
    private readonly logger: Logger;
    private readonly languageModel: LanguageModel | undefined;
    private readonly imageModel: ImageModel | undefined;
    private readonly storage: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
    } = {};

    constructor(props: IntelegenceProps) {
        this.languageModel = props.language;
        this.imageModel = props.image;
        this.storage.forImages = props.storage?.forImages;
        this.storage.forLanguage = props.storage?.forLanguage;
        this.logger = props.logger || new Logger({});
    }

    /**
     * Utilities
     */

    private requireLanguageModel(command: string): LanguageModel {
        if (!this.languageModel) {
            this.logger.logError(`No language model provided, but it is required for command: ${command}`);
            throw new Error('No language model provided');
        }
        return this.languageModel;
    }

    private requireImageModel(command: string): ImageModel {
        if (!this.imageModel) {
            this.logger.logError(`No image model provided, but it is required for command: ${command}`);
            throw new Error('No image model provided');
        }
        return this.imageModel;
    }

    private requireImageDataStore(command: string): DataStorage {
        if (!this.storage.forImages) {
            this.logger.logError(`No data store provided for images, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forImages;
    }

    private requireLanguageDataStore(command: string): DataStorage {
        if (!this.storage.forLanguage) {
            this.logger.logError(`No data store provided for languageModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forLanguage;
    }

    /**
     * Language model interfaces
     */

    public async languageAsk(question: string) {
        const model = this.requireLanguageModel('languageAsk');
        const chat = new ChatContext().addUserMessage(question);
        const modelResponse = await model.invoke({ chat, logger: this.logger });
        return modelResponse.text;
    }

    public async languageAskWithFormat({ question, format }: { question: string; format: any }) {
        const model = this.requireLanguageModel('languageAskWithFormat');
        const fullPrompt = `
            I am now asking you the following: 
            
            ${question}

            ----

            Please respond as a valid JSON string matching this format: 
            
            ${JSON.stringify(format, null, 2)}
            
            Match the structure provided, a valid response string might be look like: { "answer": "your answer here" }
            Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
            Add quotes around keys and values if they are strings, but not within the string itself.
            
            - good format: { "answer": "i said yes to her" }
            - bad format: { answer: "i said "yes" to her" }
        `;
        const chat = new ChatContext().addUserMessage(fullPrompt);
        const modelResponse = await model.invoke({ chat, logger: this.logger });
        this.logger.log('languageAskWithFormat completed');
        return BestEffortJsonParser(modelResponse.text);
    }

    public async languageAskForObjectDelta({ question, object }: { question: string; object: any }) {
        this.logger.log(`languageAskForObjectDelta called with question: ${question} and object: ${JSON.stringify(object)}`);
        const model = this.requireLanguageModel('languageAskForObjectDelta');
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
        const chat = new ChatContext().addUserMessage(fullPrompt);
        const modelResponse = await model.invoke({ chat, logger: this.logger });
        return BestEffortJsonParser(modelResponse.text);
    }

    /**
     * Image model interfaces
     */

    public async imageGenerate(prompt: string) {
        const model = this.requireImageModel('imageGenerate');
        const modelResponse = await model.generate({ prompt, logger: this.logger });
        return modelResponse.imageBase64;
    }

    public async generateImageWithDataStoreCache(prompt: string) {
        const imageModel = this.requireImageModel('generateImageWithDataStoreCache');
        const dataStore = this.requireImageDataStore('generateImageWithDataStoreCache');

        const imageKey = hash(prompt + imageModel.getName()) + '.png';
        const existsInDataStore = await dataStore.get({ key: imageKey, logger: this.logger });

        if (existsInDataStore.exists) {
            return {
                key: imageKey,
                imageBase64: existsInDataStore.data as string,
            };
        }

        const modelResponse = await imageModel.generate({ prompt, logger: this.logger });
        const buffer = Buffer.from(modelResponse.imageBase64, 'base64');
        await dataStore.set({
            key: imageKey,
            value: buffer,
            logger: this.logger,
        });

        return {
            key: imageKey,
            imageBase64: modelResponse.imageBase64,
        };
    }

    public async generateImagesWithDataStoreCache(prompts: string[]) {
        const results = await Promise.all(prompts.map(async prompt => await this.generateImageWithDataStoreCache(prompt)));
        return results;
    }
}
