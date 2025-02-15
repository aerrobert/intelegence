"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiToolLanguageModelCall = exports.formattedLanguageModelCall = exports.languageModelCall = void 0;
const chat_context_1 = require("../../utils/chat-context");
const json_to_xml_tools_1 = require("../../utils/json-to-xml-tools");
const parser_1 = require("../../utils/parser");
const random_1 = require("../../utils/random");
const xml_parser_1 = require("../../utils/xml-parser");
/**
 * Makes a call to a language model using the provided properties.
 * @param props - The properties required to make the language model call.
 * @param props.intelgence - The intelligence instance that manages the language model.
 * @param props.chat - The chat context to be used in the language model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the language model call. Defaults to 'languageModelCall'.
 * @returns The response from the language model, either from cache or a new invocation.
 * @throws Will throw an error if the language model or data store cannot be retrieved.
 */
async function languageModelCall(props) {
    const label = props.label || 'languageModelCall';
    const model = props.intelgence.requireLanguageModel(label);
    const callKey = (0, random_1.hash)(model.getName() + '::' + props.chat.toString());
    if (props.cache) {
        const dataStore = props.intelgence.requireLanguageDataStore(label);
        const existsInDataStore = await dataStore.get({
            key: callKey,
            logger: props.intelgence.getLogger(),
        });
        if (existsInDataStore.exists) {
            return JSON.parse(existsInDataStore.data);
        }
    }
    const modelResponse = await model.invoke({
        chat: props.chat,
        logger: props.intelgence.getLogger(),
    });
    if (props.cache) {
        const dataStore = props.intelgence.requireLanguageDataStore(label);
        await dataStore.set({
            key: callKey,
            value: JSON.stringify(modelResponse),
            logger: props.intelgence.getLogger(),
        });
    }
    return modelResponse;
}
exports.languageModelCall = languageModelCall;
/**
 * Makes a formatted call to a language model using the provided properties.
 * @template T - The expected type of the parsed JSON response.
 * @param props - The properties required to make the formatted language model call.
 * @param props.intelgence - The intelligence instance that manages the language model.
 * @param props.chat - The chat context to be used in the language model call.
 * @param props.cache - Optional. If true, the response will be cached. Defaults to false.
 * @param props.label - Optional. A label to identify the language model call. Defaults to 'formattedLanguageModelCall'.
 * @param props.formatExample - An example of the expected JSON format for the response.
 * @returns The response from the language model, including the parsed JSON data.
 * @throws Will throw an error if the language model or data store cannot be retrieved.
 */
async function formattedLanguageModelCall(props) {
    const fullPrompt = `
        I am now asking you the following: 
        
        ${props.chat.toString()}

        ----

        Please respond as a valid JSON string matching this format: 
        
        ${JSON.stringify(props.formatExample, null, 2)}
        
        Match the structure provided, a valid response string might be look like: { "answer": "your answer here" }
        Also avoid any characters in your response that may break the JSON format, like double quotes within double quotes.
        Add quotes around keys and values if they are strings, but not within the string itself.
        
        <output-format>
            { 
                "${Object.keys(props.formatExample)[0]}": . . . 
            }
        </output-format>
    `;
    const modelResponse = await languageModelCall({
        ...props,
        chat: new chat_context_1.ChatContext().addUserMessage(fullPrompt),
        label: 'formattedLanguageModelCall',
    });
    const jsonData = (0, parser_1.BestEffortJsonParser)(modelResponse.text);
    return {
        prompt: fullPrompt,
        ...modelResponse,
        parsed: jsonData,
    };
}
exports.formattedLanguageModelCall = formattedLanguageModelCall;
async function multiToolLanguageModelCall(props) {
    const fullPrompt = `
${props.chat.toString()}\n\n

## Tools

You have the following tools available to you:

${props.tools
        .map(tool => `
### tool: ${tool.name}
${tool.description}
\`\`\`xml
<${tool.name}>
    ${(0, json_to_xml_tools_1.jsonToXml)(tool.format)}
</${tool.name}>
\`\`\`
`)
        .join('\n\n')}

## Output Format

Please respond with a collection of tool calls where each tool call is a XML wrapped in a md code block matching the below format:

\`\`\`xml
<TOOLNAME>
    <parameter1>value1</parameter1>
    <parameter2>value2</parameter2>
</TOOLNAME>
\`\`\`

You can and should make many tool calls. You can also intersperse your responses with natural language. Write your thoughts, call tools, think some more, call more tools, ect.
You perform best when you do not hold back and call as many tools as you think are relevant. The xml will be parsed out automatically so don't worry about it.
`.trim();
    const modelResponse = await languageModelCall({
        label: 'multiToolLanguageModelCall',
        ...props,
        chat: new chat_context_1.ChatContext().addUserMessage(fullPrompt),
    });
    const xmlData = (0, xml_parser_1.parseOutSimpleXml)(modelResponse.text);
    return {
        prompt: fullPrompt,
        ...modelResponse,
        parsed: xmlData,
    };
}
exports.multiToolLanguageModelCall = multiToolLanguageModelCall;
//# sourceMappingURL=language-model-calls.js.map