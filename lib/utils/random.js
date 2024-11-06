"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.randomId = void 0;
function randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
exports.randomId = randomId;
function hash(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash + '';
}
exports.hash = hash;
//# sourceMappingURL=random.js.map