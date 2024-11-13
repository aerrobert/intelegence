import { DataStorage, DataStorageGetInput, DataStorageGetResponse, DataStorageSetInput } from '../../interfaces/storage';

interface MockedDataStorageOptions {
    initialData?: Record<string, string>;
}

export class MockedDataStorage extends DataStorage {
    private data: Record<string, string | Buffer>;

    constructor(options: MockedDataStorageOptions = {}) {
        super();
        this.data = options.initialData || {};
    }

    public getName(): string {
        return 'mocked-data';
    }

    protected async handleGet(input: DataStorageGetInput): Promise<DataStorageGetResponse> {
        const data = this.data[input.key];
        if (data) {
            return { exists: true, data: data as string };
        } else {
            return { exists: false };
        }
    }

    protected async handleSet(input: DataStorageSetInput): Promise<void> {
        this.data[input.key] = input.value;
    }
}
