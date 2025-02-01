"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockedDataStorage = void 0;
const storage_1 = require("../../interfaces/storage");
class MockedDataStorage extends storage_1.DataStorage {
    data;
    constructor(options = {}) {
        super();
        this.data = options.initialData || {};
    }
    getName() {
        return 'mocked-data';
    }
    async handleGet(input) {
        const data = this.data[input.key];
        if (data) {
            return { exists: true, data: data };
        }
        else {
            return { exists: false };
        }
    }
    async handleSet(input) {
        this.data[input.key] = input.value;
        return { key: input.key };
    }
}
exports.MockedDataStorage = MockedDataStorage;
//# sourceMappingURL=mocked.js.map