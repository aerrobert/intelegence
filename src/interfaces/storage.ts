import { Logger } from '@aerrobert/logger';
import { randomId } from '../utils/random';

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

export class DataStorage {
    public getName(): string {
        return 'unknown';
    }

    public async setRandomid(data: DataStorageSetRandomInput): Promise<DataStorageSetResponse> {
        const randomid = randomId();
        return await this.set({
            key: randomid,
            logger: data.logger,
            value: data.data,
        });
    }

    public async get(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        const result = await this.handleGet(input);
        if (result.exists) {
            input.logger.log(`Data found in storage for key: ${input.key}`);
        }
        return result;
    }

    public async set(input: DataStorageSetInput): Promise<DataStorageSetResponse> {
        input.logger.log(`Setting data in storage: ${input.key}`);
        return this.handleSet(input);
    }

    public getPermalink(key: string): string {
        return this.handlePermalink(key);
    }

    protected handlePermalink(key: string): string {
        throw new Error('Not implemented');
    }

    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        throw new Error('Not implemented');
    }

    protected handleSet(input: DataStorageSetInput): Promise<DataStorageSetResponse> {
        throw new Error('Not implemented');
    }
}
