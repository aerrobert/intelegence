import { Logger } from '@aerrobert/logger';
import { AudioModel } from '../interfaces/audio';
import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { DataStorage } from '../interfaces/storage';
import { ChatContext } from '../utils/chat-context';
import { AssignAudioModelProps, audioModelCall } from './handlers/audio-model-calls';
import { AssignImageModelProps, imageModelCall } from './handlers/image-model-calls';
import { AssignLanguageModelProps, formattedLanguageModelCall, languageModelCall } from './handlers/language-model-calls';

export interface IntelegenceProps {
    language?: LanguageModel;
    image?: ImageModel;
    audio?: AudioModel;
    storage?: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
        forAudio?: DataStorage;
    };
    logger?: Logger;
}

export class Intelegence {
    private readonly logger: Logger;
    private readonly languageModel: LanguageModel | undefined;
    private readonly imageModel: ImageModel | undefined;
    private readonly audioModel: AudioModel | undefined;
    private readonly storage: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
        forAudio?: DataStorage;
    } = {};

    constructor(props: IntelegenceProps) {
        this.languageModel = props.language;
        this.imageModel = props.image;
        this.audioModel = props.audio;
        this.storage.forImages = props.storage?.forImages;
        this.storage.forLanguage = props.storage?.forLanguage;
        this.storage.forAudio = props.storage?.forAudio;
        this.logger = props.logger || new Logger({});
    }

    /**
     * Utilities
     */

    public getLogger(): Logger {
        return this.logger;
    }

    public requireLanguageModel(command: string): LanguageModel {
        if (!this.languageModel) {
            this.logger.logError(`No language model provided, but it is required for command: ${command}`);
            throw new Error('No language model provided');
        }
        return this.languageModel;
    }

    public requireImageModel(command: string): ImageModel {
        if (!this.imageModel) {
            this.logger.logError(`No image model provided, but it is required for command: ${command}`);
            throw new Error('No image model provided');
        }
        return this.imageModel;
    }

    public requireAudioModel(command: string): AudioModel {
        if (!this.audioModel) {
            this.logger.logError(`No audio model provided, but it is required for command: ${command}`);
            throw new Error('No audio model provided');
        }
        return this.audioModel;
    }

    public requireImageDataStore(command: string): DataStorage {
        if (!this.storage.forImages) {
            this.logger.logError(`No data store provided for images, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forImages;
    }

    public requireLanguageDataStore(command: string): DataStorage {
        if (!this.storage.forLanguage) {
            this.logger.logError(`No data store provided for languageModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forLanguage;
    }

    public requireAudioDataStore(command: string): DataStorage {
        if (!this.storage.forAudio) {
            this.logger.logError(`No data store provided for audioModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forAudio;
    }

    /**
     * Language model interfaces
     */

    public ask(question: string, props: AssignLanguageModelProps = {}) {
        return languageModelCall({
            intelgence: this,
            chat: new ChatContext().addUserMessage(question),
            ...props,
        });
    }

    public async askWithFormat<T>(question: string, formatExample: any, props: AssignLanguageModelProps = {}) {
        return formattedLanguageModelCall<T>({
            intelgence: this,
            chat: new ChatContext().addUserMessage(question),
            formatExample,
            ...props,
        });
    }

    /**
     * Image model interfaces
     */

    public imagine(prompt: string, props: AssignImageModelProps = {}) {
        return imageModelCall({
            intelgence: this,
            prompt,
            ...props,
        });
    }

    public imagineAll(prompts: string[], props: AssignImageModelProps = {}) {
        return Promise.all(prompts.map(prompt => this.imagine(prompt, props)));
    }

    /**
     * Audio model interfaces
     */

    public speak(text: string, props: AssignAudioModelProps = {}) {
        return audioModelCall({
            intelgence: this,
            script: text,
            ...props,
        });
    }
}
