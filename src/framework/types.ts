import { ImageModel } from '../interfaces/image';
import { LanguageModel } from '../interfaces/language';

export interface IntelegenceProps {
    language?: LanguageModel;
    image?: ImageModel;
}

export interface AskModelProps {
    question: string;
}

export interface AskWithFormatModelProps {
    question: string;
    formatExample: any;
}

export interface AskWithToolsModelProps {
    question: string;
    tools: AskModelTool[];
}

export interface AskModelTool {
    name: string;
    description: string;
    format: any;
}

export interface ImagineProps {
    prompt: string;
}
