import { Invoker } from '../execution/invoker';
export class ChatBasedLLMInterface extends Invoker {
    onInvoke(input) {
        return this.onLLMInvoke(input);
    }
    onLLMInvoke(input) {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=chat-based-llm.js.map