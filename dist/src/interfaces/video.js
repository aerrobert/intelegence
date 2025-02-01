"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoModel = void 0;
const dedent_1 = require("../utils/dedent");
class VideoModel {
    getName() {
        return 'unknown';
    }
    async animate(props) {
        props.logger.debug(`Invoking video model ${this.getName()}: ${(0, dedent_1.dedent)(props.prompt)}`);
        const result = await this.handleAnimate(props);
        return result;
    }
    handleAnimate(props) {
        throw new Error('Not implemented');
    }
}
exports.VideoModel = VideoModel;
//# sourceMappingURL=video.js.map