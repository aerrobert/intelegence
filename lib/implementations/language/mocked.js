"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedLLM = void 0;
const language_1 = require("../../interfaces/language");
class MockedLLM extends language_1.LanguageModel {
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return 'mocked';
    }
    async handleInvoke(context) {
        return {
            text: this.props.responses.shift() || '',
        };
    }
}
exports.MockedLLM = MockedLLM;
//# sourceMappingURL=mocked.js.map