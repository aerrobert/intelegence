"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MusicModel = void 0;
const dedent_1 = require("../utils/dedent");
class MusicModel {
    getName() {
        return 'unknown';
    }
    async compose(props) {
        props.logger.debug(`Invoking music model ${this.getName()}: ${(0, dedent_1.dedent)(props.composition)}`);
        const result = await this.handleCompose(props);
        return result;
    }
    handleCompose(props) {
        throw new Error('Not implemented');
    }
}
exports.MusicModel = MusicModel;
//# sourceMappingURL=music.js.map