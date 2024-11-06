import { LanguageModel, LanguageModelResponse } from '../../interfaces/language';
import { ChatContext } from '../../utils/chat-context';

export interface MockedLLMOptions {
    responses: string[];
}

export class MockedLLM extends LanguageModel {
    constructor(private props: MockedLLMOptions) {
        super();
    }

    public override getName(): string {
        return 'mocked';
    }

    protected override async handleInvoke(context: ChatContext): Promise<LanguageModelResponse> {
        return {
            text: this.props.responses.shift() || '',
        };
    }
}
