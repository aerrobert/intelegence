import { Cache } from '../../execution/cache';
export declare class NoCache<T> extends Cache<T> {
    protected existsRaw(key: string): Promise<boolean>;
    protected setRaw(_: string, __: string): Promise<void>;
}
