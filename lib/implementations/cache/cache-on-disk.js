import { Cache } from '../../execution/cache';
import fs from 'fs';
export class CacheOnDisk extends Cache {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        fs.mkdirSync(prefix, { recursive: true });
    }
    async existsRaw(key) {
        const path = `${this.prefix}/${key}`;
        return fs.promises
            .access(path)
            .then(() => true)
            .catch(() => false);
    }
    async getRaw(key) {
        const path = `${this.prefix}/${key}`;
        return fs.promises.readFile(path, 'utf8');
    }
    async setRaw(key, value) {
        const path = `${this.prefix}/${key}`;
        return fs.promises.writeFile(path, value, 'utf8');
    }
}
