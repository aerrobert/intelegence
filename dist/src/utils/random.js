"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.randomId = void 0;
const crypto_1 = require("crypto");
function randomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
exports.randomId = randomId;
function hash(str) {
    return (0, crypto_1.createHash)('md5').update(str).digest('hex');
}
exports.hash = hash;
//# sourceMappingURL=random.js.map