import { DataStorage, DataStorageInput, DataStorageRequest, DataStorageResponse } from '../../interfaces/storage';

interface MockedDataStorageOptions {
    initialData?: Record<string, string>;
}

export class MockedDataStorage extends DataStorage {
    private data: Record<string, string>;

    constructor(options: MockedDataStorageOptions = {}) {
        super();
        this.data = options.initialData || {};
    }

    public getName(): string {
        return 'mocked-data';
    }

    protected async handleGet(input: DataStorageInput): Promise<DataStorageResponse> {
        const data = this.data[input.key];
        if (data) {
            return { exists: true, data };
        } else {
            return { exists: false };
        }
    }

    protected async handleSet(input: DataStorageRequest): Promise<void> {
        this.data[input.key] = input.value;
    }
}
