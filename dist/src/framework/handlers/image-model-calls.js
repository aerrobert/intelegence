"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModelCall = void 0;
const random_1 = require("../../utils/random");
/**
 * Makes a call to an image model using the provided properties.
 * @param props - The properties required to make the image model call.
 * @param props.intelgence - The intelligence instance that manages the image model.
 * @param props.prompt - The prompt to be used in the image model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the image model call. Defaults to 'imageModelCall'.
 * @returns The response from the image model, either from cache or a new invocation.
 * @throws Will throw an error if the image model or data store cannot be retrieved.
 */
async function imageModelCall(props) {
    const label = props.label || 'imageModelCall';
    const model = props.intelgence.requireImageModel(label);
    const callKey = (0, random_1.hash)(model.getName() + '::' + props.prompt);
    if (props.cache) {
        const dataStore = props.intelgence.requireImageDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data);
        }
    }
    const modelResponse = await model.generate({
        prompt: props.prompt,
        logger: props.intelgence.getLogger(),
    });
    if (props.cache) {
        const dataStore = props.intelgence.requireImageDataStore(label);
        // write image to data store
        await dataStore.set({
            key: callKey + '.png',
            value: Buffer.from(modelResponse.imageBase64, 'base64'),
            logger: props.intelgence.getLogger(),
        });
        modelResponse.cachedUrl = dataStore.getPermalink(callKey + '.png');
        // write response to data store
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }
    return modelResponse;
}
exports.imageModelCall = imageModelCall;
//# sourceMappingURL=image-model-calls.js.map