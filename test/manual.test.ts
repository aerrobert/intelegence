import { BedrockLLM, Intelegence, LocalDataStorage, OpenAIChatBasedLLM } from '../src';
import dotenv from 'dotenv';
dotenv.config();

it('manual', async () => {
    const AI = new Intelegence({
        language: new OpenAIChatBasedLLM({
            storage: new LocalDataStorage({
                storagePath: './storage',
            }),
        }),
    });

    const result = await AI.ask({
        question: 'What is the capital of France?',
    });
});
