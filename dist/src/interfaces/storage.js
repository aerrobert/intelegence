"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataStorage = void 0;
const random_1 = require("../utils/random");
class DataStorage {
    getName() {
        return 'unknown';
    }
    async setRandomid(data) {
        const randomid = (0, random_1.randomId)();
        return await this.set({
            key: randomid,
            logger: data.logger,
            value: data.data,
        });
    }
    async get(input) {
        const result = await this.handleGet(input);
        if (result.exists) {
            input.logger.log(`Data found in storage for key: ${input.key}`);
        }
        return result;
    }
    async set(input) {
        input.logger.log(`Setting data in storage: ${input.key}`);
        return this.handleSet(input);
    }
    getPermalink(key) {
        return this.handlePermalink(key);
    }
    handlePermalink(key) {
        throw new Error('Not implemented');
    }
    handleGet(input) {
        throw new Error('Not implemented');
    }
    handleSet(input) {
        throw new Error('Not implemented');
    }
}
exports.DataStorage = DataStorage;
//# sourceMappingURL=storage.js.map