"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedLLM = void 0;
const language_1 = require("../../interfaces/language");
class MockedLLM extends language_1.LanguageModel {
    props;
    constructor(props) {
        super();
        this.props = props;
    }
    getName() {
        return 'mocked';
    }
    async handleInvoke(props) {
        return {
            text: this.props.responses.shift() || '',
        };
    }
}
exports.MockedLLM = MockedLLM;
//# sourceMappingURL=mocked.js.map