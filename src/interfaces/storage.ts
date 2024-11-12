export interface DataStorageInput {
    key: string;
}

export interface DataStorageRequest {
    key: string;
    value: string;
}

export interface DataStorageResponse {
    exists: boolean;
    data?: string;
}

export class DataStorage {
    public getName(): string {
        return 'unknown';
    }

    public async get(input: DataStorageInput): Promise<DataStorageResponse> {
        return this.handleGet(input);
    }

    public async set(input: DataStorageRequest): Promise<void> {
        return this.handleSet(input);
    }

    protected handleGet(input: DataStorageInput): Promise<DataStorageResponse> {
        throw new Error('Not implemented');
    }

    protected handleSet(input: DataStorageRequest): Promise<void> {
        throw new Error('Not implemented');
    }
}
