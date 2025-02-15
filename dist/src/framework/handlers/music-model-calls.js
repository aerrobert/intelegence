"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.musicModelCall = void 0;
const random_1 = require("../../utils/random");
/**
 * Makes a call to a music model using the provided properties.
 * @param props - The properties required to make the music model call.
 * @param props.intelgence - The intelligence instance that manages the music model.
 * @param props.compose - The script to provide to the music model.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the music model call. Defaults to 'musicModelCall'.
 * @returns The response from the music model, either from cache or a new invocation.
 * @throws Will throw an error if the music model or data store cannot be retrieved.
 */
async function musicModelCall(props) {
    const label = props.label || 'musicModelCall';
    const model = props.intelgence.requireMusicModel(label);
    const callKey = (0, random_1.hash)(model.getName() + '::' + props.compose);
    if (props.cache) {
        const dataStore = props.intelgence.requireMusicDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data);
        }
    }
    const modelResponse = await model.compose({
        composition: props.compose,
        style: props.style,
        logger: props.intelgence.getLogger(),
    });
    if (props.cache) {
        const dataStore = props.intelgence.requireMusicDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }
    return modelResponse;
}
exports.musicModelCall = musicModelCall;
//# sourceMappingURL=music-model-calls.js.map