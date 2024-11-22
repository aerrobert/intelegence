import { Logger } from '@aerrobert/logger';
import { AudioModel } from '../interfaces/audio';
import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { MusicModel } from '../interfaces/music';
import { DataStorage } from '../interfaces/storage';
import { VideoModel } from '../interfaces/video';
import { ChatContext } from '../utils/chat-context';
import { AssignAudioModelProps, audioModelCall } from './handlers/audio-model-calls';
import { AssignImageModelProps, imageModelCall } from './handlers/image-model-calls';
import { AssignLanguageModelProps, formattedLanguageModelCall, languageModelCall } from './handlers/language-model-calls';
import { musicModelCall } from './handlers/music-model-calls';
import { AssignVideoModelProps, videoModelCall } from './handlers/video-model-calls';

export interface IntelegenceProps {
    language?: LanguageModel;
    image?: ImageModel;
    audio?: AudioModel;
    music?: MusicModel;
    video?: VideoModel;
    storage?: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
        forAudio?: DataStorage;
        forMusic?: DataStorage;
        forVideo?: DataStorage;
    };
    logger?: Logger;
}

export class Intelegence {
    private readonly logger: Logger;
    private readonly languageModel: LanguageModel | undefined;
    private readonly imageModel: ImageModel | undefined;
    private readonly audioModel: AudioModel | undefined;
    private readonly musicModel: MusicModel | undefined;
    private readonly videoModel: VideoModel | undefined;
    private readonly storage: {
        forImages?: DataStorage;
        forLanguage?: DataStorage;
        forAudio?: DataStorage;
        forMusic?: DataStorage;
        forVideo?: DataStorage;
    } = {};

    constructor(props: IntelegenceProps) {
        this.languageModel = props.language;
        this.imageModel = props.image;
        this.audioModel = props.audio;
        this.musicModel = props.music;
        this.videoModel = props.video;
        this.storage.forImages = props.storage?.forImages;
        this.storage.forLanguage = props.storage?.forLanguage;
        this.storage.forAudio = props.storage?.forAudio;
        this.storage.forMusic = props.storage?.forMusic;
        this.storage.forVideo = props.storage?.forVideo;
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

    public requireMusicModel(command: string): MusicModel {
        if (!this.musicModel) {
            this.logger.logError(`No music model provided, but it is required for command: ${command}`);
            throw new Error('No music model provided');
        }
        return this.musicModel;
    }

    public requireVideoModel(command: string): VideoModel {
        if (!this.videoModel) {
            this.logger.logError(`No video model provided, but it is required for command: ${command}`);
            throw new Error('No video model provided');
        }
        return this.videoModel;
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

    public requireMusicDataStore(command: string): DataStorage {
        if (!this.storage.forMusic) {
            this.logger.logError(`No data store provided for musicModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forMusic;
    }

    public requireVideoDataStore(command: string): DataStorage {
        if (!this.storage.forVideo) {
            this.logger.logError(`No data store provided for video model, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forVideo;
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

    /**
     * Music model interfaces
     */

    public compose(composition: string, style: string, props: AssignAudioModelProps = {}) {
        return musicModelCall({
            intelgence: this,
            compose: composition,
            style: style,
            ...props,
        });
    }

    /**
     * Video model interfaces
     */

    public animate(base64Image: string, prompt: string, props: AssignVideoModelProps = {}) {
        return videoModelCall({
            intelgence: this,
            base64Image,
            prompt,
            ...props,
        });
    }
}
