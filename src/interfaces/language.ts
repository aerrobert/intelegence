import { Logger } from '@aerrobert/logger';
import { ChatContext } from '../utils/chat-context';
import { dedent } from '../utils/dedent';

export interface LanguageModelInvokeProps {
    chat: ChatContext;
    logger: Logger;
}

export interface LanguageModelResponse {
    text: string;
}

export class LanguageModel {
    public getName(): string {
        return 'unknown';
    }

    public async invoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse> {
        props.logger.debug(`Invoking language model ${this.getName()}: ${dedent(props.chat.toString())}`);
        const result = await this.handleInvoke(props);
        props.logger.debug(`Language model ${this.getName()} returned: ${dedent(result.text)}`);
        return result;
    }

    protected handleInvoke(props: LanguageModelInvokeProps): Promise<LanguageModelResponse> {
        throw new Error('Not implemented');
    }
}
