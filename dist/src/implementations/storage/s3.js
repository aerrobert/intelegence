"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3DataStorage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const storage_1 = require("../../interfaces/storage");
class S3DataStorage extends storage_1.DataStorage {
    s3Client;
    bucketName;
    region;
    constructor({ bucketName, region }) {
        super();
        this.bucketName = bucketName;
        this.region = region || 'us-west-2';
        this.s3Client = new client_s3_1.S3Client({ region: this.region });
    }
    getName() {
        return 'aws-s3';
    }
    handlePermalink(key) {
        return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${key}`;
    }
    async handleGet(input) {
        try {
            const command = new client_s3_1.GetObjectCommand({
                Bucket: this.bucketName,
                Key: input.key,
            });
            const response = await this.s3Client.send(command);
            if (!response.Body) {
                return { exists: false };
            }
            const data = await response.Body.transformToString();
            return { exists: true, data };
        }
        catch (error) {
            return { exists: false };
        }
    }
    async handleSet(input) {
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: input.key,
            Body: input.value,
        });
        await this.s3Client.send(command);
        return { key: input.key };
    }
}
exports.S3DataStorage = S3DataStorage;
//# sourceMappingURL=s3.js.map