import { Cache } from "../../execution/cache";
export declare class CacheInLocalStorage<T> extends Cache<T> {
    constructor();
    protected existsRaw(key: string): Promise<boolean>;
    protected getRaw(key: string): Promise<string>;
    protected setRaw(key: string, value: string): Promise<void>;
}
