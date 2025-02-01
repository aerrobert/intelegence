"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunwayVideo = void 0;
const sdk_1 = __importDefault(require("@runwayml/sdk"));
const video_1 = require("../../interfaces/video");
class RunwayVideo extends video_1.VideoModel {
    client;
    constructor(props) {
        super();
        this.client = new sdk_1.default({
            apiKey: props.apiKey,
        });
    }
    getName() {
        return 'runway';
    }
    async handleAnimate(input) {
        const imageToVideo = await this.client.imageToVideo.create({
            model: 'gen3a_turbo',
            promptImage: `data:image/png;base64,${input.base64Image}`,
            promptText: input.prompt,
        });
        const taskId = imageToVideo.id;
        let task;
        while (true) {
            input.logger.debug('Waiting for runway task to complete...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            task = await this.client.tasks.retrieve(taskId);
            if (task.status === 'SUCCEEDED') {
                input.logger.debug('Runway task succeeded');
                const videoUrl = task.output[0];
                const videoRaw = await fetch(videoUrl);
                const videoBuffer = await videoRaw.arrayBuffer();
                const videoBase64 = Buffer.from(videoBuffer).toString('base64');
                return { base64Video: videoBase64 };
            }
            if (task.status === 'PENDING' || task.status === 'RUNNING') {
                continue;
            }
            input.logger.logError(`Runway task failed: ${task.status}`);
            throw new Error(`Runway task failed: ${task.status}`);
        }
    }
}
exports.RunwayVideo = RunwayVideo;
//# sourceMappingURL=runway.js.map