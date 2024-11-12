import { Intelegence } from '../src';
import { MockedImageModel } from '../src/implementations/images/mocked';
import { MockedLLM } from '../src/implementations/language/mocked';

describe('Intelegence', () => {
    it('should return "Hello, world!"', async () => {
        const intelegence = new Intelegence({
            language: new MockedLLM({
                responses: ['Hello, world!'],
            }),
            image: new MockedImageModel({
                responses: ['a'],
            }),
        });
        const answer = await intelegence.languageAsk('');
        expect(answer).toEqual('Hello, world!');
        const image = await intelegence.imageGenerate('');
        expect(image).toEqual('a');
    });
});
