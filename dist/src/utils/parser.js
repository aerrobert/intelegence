"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BestEffortJsonParser = void 0;
function BestEffortJsonParser(input) {
    const firstCurly = input.indexOf('{');
    const lastCurly = input.lastIndexOf('}');
    const json = input.substring(firstCurly, lastCurly + 1);
    try {
        return JSON.parse(json);
    }
    catch (e) {
        try {
            return eval('(' + json + ')');
        }
        catch (e) {
            return undefined;
        }
    }
}
exports.BestEffortJsonParser = BestEffortJsonParser;
//# sourceMappingURL=parser.js.map