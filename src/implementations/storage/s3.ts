import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput } from '../../interfaces/storage';

export class S3DataStorage extends DataStorage {
    private s3Client: S3Client;
    private bucketName: string;

    constructor({ bucketName, region }: { bucketName: string; region?: string }) {
        super();
        this.bucketName = bucketName;
        this.s3Client = new S3Client({ region: region || 'us-west-2' });
    }

    public getName(): string {
        return 'aws-s3';
    }

    protected async handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        try {
            const command = new GetObjectCommand({
                Bucket: this.bucketName,
                Key: input.key,
            });
            const response = await this.s3Client.send(command);
            if (!response.Body) {
                return { exists: false };
            }
            const data = await response.Body.transformToString();
            return { exists: true, data };
        } catch (error) {
            console.warn(error);
            return { exists: false };
        }
    }

    protected async handleSet(input: DataStorageSetInput): Promise<void> {
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: input.key,
            Body: input.value,
        });
        await this.s3Client.send(command);
    }
}
