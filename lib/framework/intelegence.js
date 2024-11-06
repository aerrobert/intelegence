"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Intelegence = void 0;
const chat_context_1 = require("../utils/chat-context");
const parser_1 = require("../utils/parser");
class Intelegence {
    constructor(props) {
        this.languageModel = props.language;
    }
    /**
     * Utilities
     */
    requireLanguageModel() {
        if (!this.languageModel) {
            throw new Error('No language model provided');
        }
        return this.languageModel;
    }
    /**
     * Language model interfaces
     */
    async languageAsk(question) {
        const model = this.requireLanguageModel();
        const modelResponse = await model.invoke(new chat_context_1.ChatContext().addUserMessage(question));
        return modelResponse.text;
    }
    async languageAskWithFormat({ chat, question, format }) {
        const model = this.requireLanguageModel();
        const fullPrompt = `
            I am now asking you the following: 
            
            ${prompt}

            ----

            Please respond as a valid JSON string matching this format: ${JSON.stringify(format)}. 
            
            Match the structure provided, a valid response string might be look like: { "answer": "your answer here" }
            Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
            Add quotes around keys and values if they are strings, but not within the string itself.
            
            - good format: { "answer": "i said yes to her" }
            - bad format: { answer: "i said "yes" to her" }
        `;
        const chatHistory = chat_context_1.ChatContext.fromStrings(chat);
        const modelResponse = await model.invoke(chatHistory.addUserMessage(fullPrompt));
        return (0, parser_1.BestEffortJsonParser)(modelResponse.text);
    }
    async languageAskForObjectDelta({ chat, question, object }) {
        const model = this.requireLanguageModel();
        const fullPrompt = `

            You have the following object:

            ${JSON.stringify(object)}

            I am now asking you to make the following edits to it:
            
            ${question}

            ----

            Please respond as a valid PARTIAL JSON string which will be merged into the object.
            Only change fields that you want to update, and leave the rest out.

            For example, if the original object is { "name": "John", "age": 30 } and I ask you to change the name to "Jane", you would respond with { "name": "Jane" }.
            You can change multiple fields at once, but only the fields you want to change.

            Additionally, your response should be a valid JSON string, and avoid any characters that may break the JSON format, like double quotes within double quotes.
            - good format: { "name": "Jane" }
            - bad format: { name: "Jane" }
            
        `;
        const chatHistory = chat_context_1.ChatContext.fromStrings(chat);
        const modelResponse = await model.invoke(chatHistory.addUserMessage(fullPrompt));
        return (0, parser_1.BestEffortJsonParser)(modelResponse.text);
    }
}
exports.Intelegence = Intelegence;
//# sourceMappingURL=intelegence.js.map