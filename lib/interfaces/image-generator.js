import { Invoker } from '../execution/invoker';
export class ImageGeneratorAIInterface extends Invoker {
    constructor(props) {
        super(props);
        this.saver = props.saver;
    }
    async onInvoke(input, execution) {
        const image = await this.onGenerateImage(input);
        return await this.saver.save('image-result', image, execution);
    }
    onGenerateImage(input) {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=image-generator.js.map