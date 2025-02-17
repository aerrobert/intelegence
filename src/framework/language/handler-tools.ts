import { ChatContext } from '../../utils/chat-context';
import { jsonToXml } from '../../utils/json-to-xml-tools';
import { parseOutSimpleXml } from '../../utils/xml-parser';
import { AskWithToolsModelProps } from '../types';
import { LanguageModel } from '../../interfaces/language';
import { dedent } from '../../utils/dedent';

export async function ToolsLanguageModel(model: LanguageModel, props: AskWithToolsModelProps) {
    const tools = props.tools.map(tool =>
        dedent(`
        ### tool: ${tool.name}
        ${tool.description}
        \`\`\`xml
        <${tool.name}>
            ${jsonToXml(tool.format)}
        </${tool.name}>
        \`\`\`
    `)
    );

    const chat = new ChatContext().addUserMessage(props.question).addUserMessage(`
            You have the following tools available to you:
            ${tools.join('\n\n')}
        `).addUserMessage(`
            Please respond with a collection of tool calls where each tool call is a XML wrapped in a md code block matching the below format:

            \`\`\`xml
            <TOOLNAME>
                <parameter1>value1</parameter1>
                <parameter2>value2</parameter2>
            </TOOLNAME>
            \`\`\`

            You can and should make many tool calls. You can also intersperse your responses with natural language. Write your thoughts, call tools, think some more, call more tools, ect.
            You perform best when you do not hold back and call as many tools as you think are relevant. The xml will be parsed out automatically so don't worry about it.
        `);

    const modelResponse = await model.invoke({ chat });
    const xmlData = parseOutSimpleXml(modelResponse.response);

    return {
        chat,
        ...modelResponse,
        parsed: xmlData,
    };
}
