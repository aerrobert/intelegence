import { Saver } from '../../execution/saver';
import { randomId } from '../../utils/random';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from 'fs';
export class SaveExecutionToS3 extends Saver {
    constructor(bucket) {
        super();
        this.bucket = bucket;
        this.S3Client = new S3Client();
    }
    uploadLocalPathToRemote(localPath, remotePath) {
        const relativePath = localPath.split(process.cwd() + '/')[1];
        return this.S3Client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: remotePath,
            Body: fs.readFileSync(relativePath)
        }));
    }
    uploadRawStringToRemote(data, remotePath) {
        return this.S3Client.send(new PutObjectCommand({
            Bucket: this.bucket,
            Key: remotePath,
            Body: data
        }));
    }
    buildUrlForPath(path) {
        return `https://us-west-2.console.aws.amazon.com/s3/object/${this.bucket}?region=us-west-2&bucketType=general&prefix=${path}`;
    }
    async saveRaw(value) {
        const promises = [];
        // Also upload all the assets
        for (const [label, asset] of Object.entries(value.assets)) {
            let path = `assets/${randomId()}`;
            if (asset.type === 'image') {
                path += '.png';
            }
            promises.push(this.uploadLocalPathToRemote(asset.accessUrl, path));
            value.assets[label].accessUrl = this.buildUrlForPath(path);
        }
        await Promise.all(promises);
        // Then upload the execution json itself
        const rawExecutionData = JSON.stringify(value, null, 2);
        const path = `executions/${randomId()}.json`;
        promises.push(this.uploadRawStringToRemote(rawExecutionData, path));
        await Promise.all(promises);
        return {
            accessUrl: this.buildUrlForPath(path)
        };
    }
}
