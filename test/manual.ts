import { Intelegence } from '../src';
import { OpenAIImageModel } from '../src/implementations/images/openai';

const intelegence = new Intelegence({
    image: new OpenAIImageModel({
        apiKey: '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',
    }),
});

intelegence.imageGenerate('a cat').then(console.log);
