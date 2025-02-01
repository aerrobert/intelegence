import { Logger } from '@aerrobert/logger';
import { AudioModel } from '../interfaces/audio';
import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { MusicModel } from '../interfaces/music';
import { DataStorage } from '../interfaces/storage';
import { VideoModel } from '../interfaces/video';
import { AssignAudioModelProps } from './handlers/audio-model-calls';
import { AssignImageModelProps } from './handlers/image-model-calls';
import { AssignLanguageModelProps } from './handlers/language-model-calls';
import { AssignVideoModelProps } from './handlers/video-model-calls';
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
export declare class Intelegence {
    private readonly logger;
    private readonly languageModel;
    private readonly imageModel;
    private readonly audioModel;
    private readonly musicModel;
    private readonly videoModel;
    private readonly storage;
    constructor(props: IntelegenceProps);
    /**
     * Utilities
     */
    getLogger(): Logger;
    requireLanguageModel(command: string): LanguageModel;
    requireImageModel(command: string): ImageModel;
    requireAudioModel(command: string): AudioModel;
    requireMusicModel(command: string): MusicModel;
    requireVideoModel(command: string): VideoModel;
    requireImageDataStore(command: string): DataStorage;
    requireLanguageDataStore(command: string): DataStorage;
    requireAudioDataStore(command: string): DataStorage;
    requireMusicDataStore(command: string): DataStorage;
    requireVideoDataStore(command: string): DataStorage;
    /**
     * Language model interfaces
     */
    ask(question: string, props?: AssignLanguageModelProps): Promise<import("../interfaces/language").LanguageModelResponse>;
    askWithFormat<T>(question: string, formatExample: any, props?: AssignLanguageModelProps): Promise<{
        parsed: T;
        text: string;
    }>;
    /**
     * Image model interfaces
     */
    imagine(prompt: string, props?: AssignImageModelProps): Promise<import("../interfaces/image").ImageModelResponse>;
    imagineAll(prompts: string[], props?: AssignImageModelProps): Promise<import("../interfaces/image").ImageModelResponse[]>;
    /**
     * Audio model interfaces
     */
    speak(text: string, props?: AssignAudioModelProps): Promise<import("../interfaces/audio").AudioModelResponse>;
    /**
     * Music model interfaces
     */
    compose(composition: string, style: string, props?: AssignAudioModelProps): Promise<import("../interfaces/music").MusicModelResponse>;
    /**
     * Video model interfaces
     */
    animate(base64Image: string, prompt: string, props?: AssignVideoModelProps): Promise<import("../interfaces/video").VideoModelResponse>;
}
