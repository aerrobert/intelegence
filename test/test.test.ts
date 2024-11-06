import { Intelegence, OpenAIChatBasedLLM } from '../src';

const intelegence = new Intelegence({
    using: {
        chatBasedLLM: new OpenAIChatBasedLLM(),
    },
});

const answer = await intelegence.begin().consider('Hello, world!');
expect(answer).toBe('Hello, world!');
