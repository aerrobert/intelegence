import { Intelegence } from '../src';
import { MockedLLM } from '../src/implementations/language/mocked';

describe('Intelegence', () => {
    it('should return "Hello, world!"', async () => {
        const intelegence = new Intelegence({
            language: new MockedLLM({
                responses: ['Hello, world!'],
            }),
        });
        const answer = await intelegence.languageAsk('');
        expect(answer).toEqual('Hello, world!');
    });
});
