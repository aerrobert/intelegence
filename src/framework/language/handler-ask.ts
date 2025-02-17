import { LanguageModel } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';
import { AskModelProps } from '../types';

export async function AskLangaugeModel(model: LanguageModel, props: AskModelProps) {
    const chat = new ChatContext().addUserMessage(props.question);
    return {
        chat,
        response: await model.invoke({ chat }),
    };
}
