export declare class Cache<T> {
    exists(key: string): Promise<boolean>;
    protected existsRaw(_: string): Promise<boolean>;
    get(key: string): Promise<T>;
    protected getRaw(_: string): Promise<string>;
    set(key: string, value: T): Promise<void>;
    protected setRaw(_: string, __: string): Promise<void>;
}
