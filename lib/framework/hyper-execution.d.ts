import { ChatMessage } from './chat-context';
import { Hyper } from './hyper';
import { SaverResult } from '../execution/saver';
import { LLMChatResponse } from '../interfaces/chat-based-llm';
import { ImageToImageGeneratorInput } from '../interfaces/image-to-image-generator';
export interface HyperExecutionResultAsset {
    type: 'image';
    accessUrl: string;
}
export interface ExecutionResult {
    id: string;
    start: Date;
    end: Date;
    state: any;
    messages: ChatMessage[];
    assets: Record<string, HyperExecutionResultAsset>;
}
export declare class HyperExecution {
    private hyper;
    private id;
    private startedAt;
    private runningState;
    private chatContext;
    private resultAssets;
    private rootTaskId;
    constructor(hyper: Hyper);
    get state(): any;
    get assets(): Record<string, HyperExecutionResultAsset>;
    get tasks(): import("./tasks").Tasks;
    get rootTask(): string;
    saveAsset(id: string, asset: HyperExecutionResultAsset): void;
    updateState(state: any): void;
    save(): Promise<SaverResult>;
    tell(message: string): void;
    consider(message: string): Promise<LLMChatResponse>;
    ask({ prompt, format }: {
        prompt: string;
        format: any;
    }): Promise<LLMChatResponse>;
    generateImageFromImage(input: ImageToImageGeneratorInput): Promise<SaverResult>;
    generateImagesFromImages(inputs: ImageToImageGeneratorInput[]): Promise<SaverResult[]>;
    generateImage(id: string, prompt: string): Promise<SaverResult>;
    generateImages(prompts: {
        [key: string]: string;
    }): Promise<SaverResult[]>;
}
