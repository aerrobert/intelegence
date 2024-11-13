import { randomId } from '../utils/random';

export interface DataStorageGetInput {
    key: string;
}

export interface DataStorageSetInput {
    key: string;
    value: string | Buffer;
}

export interface DataStorageGetResponse {
    exists: boolean;
    data?: string;
}

export class DataStorage {
    public getName(): string {
        return 'unknown';
    }

    public async setRandomid(data: string | Buffer): Promise<string> {
        const randomid = randomId();
        await this.set({ key: randomid, value: data });
        return randomid;
    }

    public async get(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        return this.handleGet(input);
    }

    public async set(input: DataStorageSetInput): Promise<void> {
        return this.handleSet(input);
    }

    protected handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        throw new Error('Not implemented');
    }

    protected handleSet(input: DataStorageSetInput): Promise<void> {
        throw new Error('Not implemented');
    }
}
