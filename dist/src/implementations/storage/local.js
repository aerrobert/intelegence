"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalDataStorage = void 0;
const fs_1 = __importDefault(require("fs"));
const path = __importStar(require("path"));
const storage_1 = require("../../interfaces/storage");
class LocalDataStorage extends storage_1.DataStorage {
    storagePath;
    constructor({ storagePath }) {
        super();
        this.storagePath = storagePath;
    }
    getName() {
        return 'local-storage';
    }
    async handleGet(input) {
        try {
            const filePath = path.join(this.storagePath, input.key);
            const data = await fs_1.default.promises.readFile(filePath, 'utf-8');
            return { exists: true, data: data };
        }
        catch (error) {
            return { exists: false };
        }
    }
    async handleSet(input) {
        const filePath = path.join(this.storagePath, input.key);
        await fs_1.default.promises.writeFile(filePath, input.value, 'utf-8');
        return { key: input.key };
    }
}
exports.LocalDataStorage = LocalDataStorage;
//# sourceMappingURL=local.js.map