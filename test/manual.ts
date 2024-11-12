import { Intelegence } from '../src';
import { OpenAIImageModel } from '../src/implementations/images/openai';
import { S3DataStorage } from '../src/implementations/storage/s3';

const intelegence = new Intelegence({
    image: new OpenAIImageModel({
        apiKey: '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',
    }),
    dataStore: new S3DataStorage({
        bucketName: 'aivideogenerator-405505053377-prod-job-data-bucket',
    }),
});

intelegence.imageGenerateAndSaveInDataStore('test-img', 'a cat');
