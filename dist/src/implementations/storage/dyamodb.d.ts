import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput, DataStorageSetResponse } from '../../interfaces/storage';
export declare class DynamoDBDataStorage extends DataStorage {
    private dynamoDBClient;
    private tableName;
    constructor({ tableName, region }: {
        tableName: string;
        region?: string;
    });
    getName(): string;
    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
}
