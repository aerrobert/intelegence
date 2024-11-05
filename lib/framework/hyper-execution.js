import { BestEffortJsonParser } from '../utils/parser';
import { ChatContext } from './chat-context';
import { deepMergeTogether } from '../utils/deepMerge';
import { randomId } from '../utils/random';
export class HyperExecution {
    constructor(hyper) {
        this.hyper = hyper;
        this.id = randomId();
        this.startedAt = new Date();
        this.runningState = {};
        this.chatContext = new ChatContext([]);
        this.resultAssets = {};
        this.rootTaskId = this.tasks.startTask('Execution');
    }
    // Operations to the execution itself
    get state() {
        return this.runningState;
    }
    get assets() {
        return this.resultAssets;
    }
    get tasks() {
        return this.hyper.tasks;
    }
    get rootTask() {
        return this.rootTaskId;
    }
    saveAsset(id, asset) {
        this.resultAssets[id] = asset;
    }
    updateState(state) {
        this.runningState = deepMergeTogether(this.runningState, state);
    }
    // Final Results
    async save() {
        const executionResult = {
            id: this.id,
            start: this.startedAt,
            end: new Date(),
            state: this.state,
            messages: this.chatContext.getMessages(),
            assets: this.assets,
        };
        const data = await this.hyper.executionDataSaver.save('execution result data', executionResult, this);
        this.tasks.endTask(this.rootTaskId);
        return { accessUrl: data.accessUrl, raw: executionResult };
    }
    // Interacting with AI interfaces
    tell(message) {
        this.chatContext = this.chatContext
            .addUserMessage(message)
            .addBotMessage("Understood");
    }
    async consider(message) {
        const fullPrompt = `
            I am now asking you the following: 
            
            ${prompt}

            ----
            Please respond as in sentences or pharagraphs or bullets. Do not use an explicit JSON format.
        `;
        const updatedContext = this.chatContext.addUserMessage(fullPrompt);
        const modelResponse = await this.hyper.chatBasedLLMInvoker.invoke(updatedContext, this);
        this.chatContext = updatedContext.addBotMessage(modelResponse.text);
        return modelResponse;
    }
    async ask({ prompt, format }) {
        const fullPrompt = `
            I am now asking you the following: 
            
            ${prompt}

            ----

            Please respond as a valid JSON string matching this format: ${JSON.stringify(format)}. 
            
            Match the structure provided, but a valid response string might be: { "answer": "your answer here" }
            Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
            Add quotes around keys and values if they are strings, but not within the string itself.
            
            - good format: { "answer": "i said yes to her" }
            - bad format: { "answer": "i said "yes" to her" }
        `;
        const updatedContext = this.chatContext.addUserMessage(fullPrompt);
        const modelResponse = await this.hyper.chatBasedLLMInvoker.invoke(updatedContext, this);
        const jsonData = BestEffortJsonParser(modelResponse.text);
        if (!jsonData) {
            this.tasks.errorTask(this.rootTaskId, 'Invalid JSON response from model: ' + modelResponse.text);
            console.log(modelResponse.text);
            throw new Error('Invalid JSON response from model');
        }
        this.chatContext = updatedContext.addBotMessage(modelResponse.text);
        this.updateState(jsonData);
        return modelResponse;
    }
    async generateImageFromImage(input) {
        const image = await this.hyper.imageToImageGeneratorInvoker.invoke(input, this);
        this.resultAssets[input.prompt] = { type: 'image', accessUrl: image.accessUrl };
        return image;
    }
    async generateImagesFromImages(inputs) {
        return await Promise.all(inputs.map(input => this.generateImageFromImage(input)));
    }
    async generateImage(id, prompt) {
        const image = await this.hyper.imageGeneratorInvoker.invoke({ prompt }, this);
        this.resultAssets[id] = { type: 'image', accessUrl: image.accessUrl };
        return image;
    }
    async generateImages(prompts) {
        return await Promise.all(Object.entries(prompts).map(([id, prompt]) => this.generateImage(id, prompt)));
    }
}
