"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intelegence = void 0;
const logger_1 = require("@aerrobert/logger");
const chat_context_1 = require("../utils/chat-context");
const audio_model_calls_1 = require("./handlers/audio-model-calls");
const image_model_calls_1 = require("./handlers/image-model-calls");
const language_model_calls_1 = require("./handlers/language-model-calls");
const music_model_calls_1 = require("./handlers/music-model-calls");
const video_model_calls_1 = require("./handlers/video-model-calls");
class Intelegence {
    logger;
    languageModel;
    imageModel;
    audioModel;
    musicModel;
    videoModel;
    storage = {};
    constructor(props) {
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
        this.logger = props.logger || new logger_1.Logger({});
    }
    /**
     * Utilities
     */
    getLogger() {
        return this.logger;
    }
    requireLanguageModel(command) {
        if (!this.languageModel) {
            this.logger.logError(`No language model provided, but it is required for command: ${command}`);
            throw new Error('No language model provided');
        }
        return this.languageModel;
    }
    requireImageModel(command) {
        if (!this.imageModel) {
            this.logger.logError(`No image model provided, but it is required for command: ${command}`);
            throw new Error('No image model provided');
        }
        return this.imageModel;
    }
    requireAudioModel(command) {
        if (!this.audioModel) {
            this.logger.logError(`No audio model provided, but it is required for command: ${command}`);
            throw new Error('No audio model provided');
        }
        return this.audioModel;
    }
    requireMusicModel(command) {
        if (!this.musicModel) {
            this.logger.logError(`No music model provided, but it is required for command: ${command}`);
            throw new Error('No music model provided');
        }
        return this.musicModel;
    }
    requireVideoModel(command) {
        if (!this.videoModel) {
            this.logger.logError(`No video model provided, but it is required for command: ${command}`);
            throw new Error('No video model provided');
        }
        return this.videoModel;
    }
    requireImageDataStore(command) {
        if (!this.storage.forImages) {
            this.logger.logError(`No data store provided for images, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forImages;
    }
    requireLanguageDataStore(command) {
        if (!this.storage.forLanguage) {
            this.logger.logError(`No data store provided for languageModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forLanguage;
    }
    requireAudioDataStore(command) {
        if (!this.storage.forAudio) {
            this.logger.logError(`No data store provided for audioModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forAudio;
    }
    requireMusicDataStore(command) {
        if (!this.storage.forMusic) {
            this.logger.logError(`No data store provided for musicModel, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forMusic;
    }
    requireVideoDataStore(command) {
        if (!this.storage.forVideo) {
            this.logger.logError(`No data store provided for video model, but it is required for command: ${command}`);
            throw new Error('No data store provided');
        }
        return this.storage.forVideo;
    }
    /**
     * Language model interfaces
     */
    ask(question, props = {}) {
        return (0, language_model_calls_1.languageModelCall)({
            intelgence: this,
            chat: new chat_context_1.ChatContext().addUserMessage(question),
            ...props,
        });
    }
    async askWithFormat(question, formatExample, props = {}) {
        return (0, language_model_calls_1.formattedLanguageModelCall)({
            intelgence: this,
            chat: new chat_context_1.ChatContext().addUserMessage(question),
            formatExample,
            ...props,
        });
    }
    async askWithTools(question, tools, props = {}) {
        return (0, language_model_calls_1.multiToolLanguageModelCall)({
            intelgence: this,
            chat: new chat_context_1.ChatContext().addUserMessage(question),
            tools,
            ...props,
        });
    }
    /**
     * Image model interfaces
     */
    imagine(prompt, props = {}) {
        return (0, image_model_calls_1.imageModelCall)({
            intelgence: this,
            prompt,
            ...props,
        });
    }
    imagineAll(prompts, props = {}) {
        return Promise.all(prompts.map(prompt => this.imagine(prompt, props)));
    }
    /**
     * Audio model interfaces
     */
    speak(text, props = {}) {
        return (0, audio_model_calls_1.audioModelCall)({
            intelgence: this,
            script: text,
            ...props,
        });
    }
    /**
     * Music model interfaces
     */
    compose(composition, style, props = {}) {
        return (0, music_model_calls_1.musicModelCall)({
            intelgence: this,
            compose: composition,
            style: style,
            ...props,
        });
    }
    /**
     * Video model interfaces
     */
    animate(base64Image, prompt, props = {}) {
        return (0, video_model_calls_1.videoModelCall)({
            intelgence: this,
            base64Image,
            prompt,
            ...props,
        });
    }
}
exports.Intelegence = Intelegence;
//# sourceMappingURL=intelegence.js.map