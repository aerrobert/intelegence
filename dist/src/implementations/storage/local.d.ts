import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput, DataStorageSetResponse } from '../../interfaces/storage';
export declare class LocalDataStorage extends DataStorage {
    private storagePath;
    constructor({ storagePath }: {
        storagePath: string;
    });
    getName(): string;
    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
}
