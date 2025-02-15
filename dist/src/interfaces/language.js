"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModel = void 0;
const dedent_1 = require("../utils/dedent");
class LanguageModel {
    getName() {
        return 'unknown';
    }
    async invoke(props) {
        props.logger.debug(`Invoking language model ${this.getName()}: ${(0, dedent_1.dedent)(props.chat.toString())}`);
        const result = await this.handleInvoke(props);
        props.logger.debug(`Language model ${this.getName()} returned: ${(0, dedent_1.dedent)(result.text)}`);
        return result;
    }
    handleInvoke(props) {
        throw new Error('Not implemented');
    }
}
exports.LanguageModel = LanguageModel;
//# sourceMappingURL=language.js.map