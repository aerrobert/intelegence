"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const mocked_1 = require("../src/implementations/images/mocked");
const mocked_2 = require("../src/implementations/language/mocked");
describe('Intelegence', () => {
    it('should return "Hello, world!"', async () => {
        const intelegence = new src_1.Intelegence({
            language: new mocked_2.MockedLLM({
                responses: ['Hello, world!'],
            }),
            image: new mocked_1.MockedImageModel({
                responses: ['a'],
            }),
        });
        const answer = await intelegence.ask('');
        expect(answer).toEqual({
            text: 'Hello, world!',
        });
        const image = await intelegence.imagine('a cat');
        expect(image).toEqual({ imageBase64: 'a' });
    });
});
//# sourceMappingURL=test.test.js.map