/// <reference types="node" />
import { Logger } from '@aerrobert/logger';
export interface DataStorageGetInput {
    key: string;
    logger: Logger;
}
export interface DataStorageSetRandomInput {
    logger: Logger;
    data: string | Buffer;
}
export interface DataStorageSetInput {
    key: string;
    logger: Logger;
    value: string | Buffer;
}
export interface DataStorageGetResponse {
    exists: boolean;
    data?: string;
}
export interface DataStorageSetResponse {
    key: string;
}
export declare class DataStorage {
    getName(): string;
    setRandomid(data: DataStorageSetRandomInput): Promise<DataStorageSetResponse>;
    get(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    set(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
    getPermalink(key: string): string;
    protected handlePermalink(key: string): string;
    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
}
