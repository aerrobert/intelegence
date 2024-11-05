import { Cache } from '../../execution/cache';
export class NoCache extends Cache {
    existsRaw(key) {
        return Promise.resolve(false);
    }
    setRaw(_, __) {
        return Promise.resolve();
    }
}
