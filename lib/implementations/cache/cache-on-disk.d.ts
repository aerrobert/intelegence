import { Cache } from '../../execution/cache';
export declare class CacheOnDisk<T> extends Cache<T> {
    private prefix;
    constructor(prefix: string);
    protected existsRaw(key: string): Promise<boolean>;
    protected getRaw(key: string): Promise<string>;
    protected setRaw(key: string, value: string): Promise<void>;
}
