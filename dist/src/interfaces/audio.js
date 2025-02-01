"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioModel = void 0;
const dedent_1 = require("../utils/dedent");
class AudioModel {
    getName() {
        return 'unknown';
    }
    async speak(props) {
        props.logger.debug(`Invoking audio model ${this.getName()}: ${(0, dedent_1.dedent)(props.script)}`);
        const result = await this.handleSpeak(props);
        return result;
    }
    handleSpeak(props) {
        throw new Error('Not implemented');
    }
}
exports.AudioModel = AudioModel;
//# sourceMappingURL=audio.js.map