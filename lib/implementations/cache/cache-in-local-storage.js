import { Cache } from "../../execution/cache";
export class CacheInLocalStorage extends Cache {
    constructor() {
        super();
    }
    async existsRaw(key) {
        return localStorage.getItem(key) !== null;
    }
    async getRaw(key) {
        return localStorage.getItem(key);
    }
    async setRaw(key, value) {
        localStorage.setItem(key, value);
    }
}
