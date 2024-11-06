"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageModel = void 0;
class LanguageModel {
    getName() {
        return 'unknown';
    }
    invoke(input) {
        return this.handleInvoke(input);
    }
    handleInvoke(input) {
        throw new Error('Not implemented');
    }
}
exports.LanguageModel = LanguageModel;
//# sourceMappingURL=language.js.map