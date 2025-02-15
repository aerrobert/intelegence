"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoModelCall = void 0;
const random_1 = require("../../utils/random");
async function videoModelCall(props) {
    const label = props.label || 'videoModelCall';
    const videoModel = props.intelgence.requireVideoModel(label);
    const callKey = (0, random_1.hash)(videoModel.getName() + '::' + props.base64Image + '::' + props.prompt);
    if (props.cache) {
        const dataStore = props.intelgence.requireVideoDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data);
        }
    }
    const modelResponse = await videoModel.animate({
        base64Image: props.base64Image,
        prompt: props.prompt,
        logger: props.intelgence.getLogger(),
    });
    if (props.cache) {
        const dataStore = props.intelgence.requireVideoDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }
    return modelResponse;
}
exports.videoModelCall = videoModelCall;
//# sourceMappingURL=video-model-calls.js.map