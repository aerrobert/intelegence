import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput, DataStorageSetResponse } from '../../interfaces/storage';
export declare class S3DataStorage extends DataStorage {
    private s3Client;
    private bucketName;
    private region;
    constructor({ bucketName, region }: {
        bucketName: string;
        region?: string;
    });
    getName(): string;
    protected handlePermalink(key: string): string;
    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse>;
    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse>;
}
