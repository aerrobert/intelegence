export class Cache {
    async exists(key) {
        return await this.existsRaw(key);
    }
    existsRaw(_) {
        throw new Error('Not implemented');
    }
    async get(key) {
        const data = await this.getRaw(key);
        return JSON.parse(data);
    }
    getRaw(_) {
        throw new Error('Not implemented');
    }
    async set(key, value) {
        const data = JSON.stringify(value, null, 2);
        await this.setRaw(key, data);
    }
    setRaw(_, __) {
        throw new Error('Not implemented');
    }
}
