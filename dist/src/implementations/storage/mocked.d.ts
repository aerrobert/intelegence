import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput, DataStorageSetResponse } from '../../interfaces/storage';
interface MockedDataStorageOptions {
    initialData?: Record<string, string>;
}
export declare class MockedDataStorage extends DataStorage {
    private data;
    constructor(options?: MockedDataStorageOptions);
    getName(): string;
    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
}
export {};
