import { Invoker } from '../execution/invoker';
export class ImageToImageGeneratorAIInterface extends Invoker {
    constructor(props) {
        super(props);
        this.saver = props.saver;
    }
    async onInvoke(input, execution) {
        const formattedInput = Object.assign(Object.assign({}, input), { imageUrl: input.imageUrl.split(process.cwd())[1] || input.imageUrl });
        if (formattedInput.imageUrl.startsWith('/'))
            formattedInput.imageUrl = formattedInput.imageUrl.slice(1);
        const image = await this.onGenerateImage(formattedInput);
        return await this.saver.save('image-result', image, execution);
    }
    onGenerateImage(input) {
        throw new Error('Not implemented');
    }
}
//# sourceMappingURL=image-to-image-generator.js.map