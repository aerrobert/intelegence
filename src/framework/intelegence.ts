import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';
import { imagineImageModel } from './images/handler-imagine';
import { AskLangaugeModel } from './language/handler-ask';
import { FormattedLanguageModel } from './language/handler-formatted';
import { ToolsLanguageModel } from './language/handler-tools';
import { AskModelProps, AskWithFormatModelProps, AskWithToolsModelProps, ImagineProps, IntelegenceProps } from './types';

export class Intelegence {
    private readonly languageModel: LanguageModel | undefined;
    private readonly imageModel: ImageModel | undefined;

    constructor(props: IntelegenceProps) {
        this.languageModel = props.language;
        this.imageModel = props.image;
    }

    /**
     * Utilities
     */

    private requireLanguageModel(command: string): LanguageModel {
        if (!this.languageModel) {
            throw new Error(`No language model provided, but it is required for command: ${command}`);
        }
        return this.languageModel;
    }

    private requireImageModel(command: string): ImageModel {
        if (!this.imageModel) {
            throw new Error(`No image model provided, but it is required for command: ${command}`);
        }
        return this.imageModel;
    }

    /**
     * Language model interfaces
     */

    public ask(props: AskModelProps) {
        const languageModel = this.requireLanguageModel('ask');
        return AskLangaugeModel(languageModel, props);
    }

    public async askWithFormat<T>(props: AskWithFormatModelProps) {
        const languageModel = this.requireLanguageModel('askWithFormat');
        return FormattedLanguageModel<T>(languageModel, props);
    }

    public async askWithTools(props: AskWithToolsModelProps) {
        const languageModel = this.requireLanguageModel('askWithTools');
        return ToolsLanguageModel(languageModel, props);
    }

    /**
     * Image model interfaces
     */

    public imagine(props: ImagineProps) {
        const model = this.requireImageModel('imagine');
        return imagineImageModel(model, props);
    }
}
