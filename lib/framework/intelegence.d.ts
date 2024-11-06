import { LanguageModel } from '../interfaces/language';
export interface IntelegenceProps {
    language?: LanguageModel;
}
export declare class Intelegence {
    private readonly languageModel;
    constructor(props: IntelegenceProps);
    /**
     * Utilities
     */
    private requireLanguageModel;
    /**
     * Language model interfaces
     */
    languageAsk(question: string): Promise<string>;
    languageAskWithFormat({ chat, question, format }: {
        chat: string[] | undefined;
        question: string;
        format: string;
    }): Promise<any>;
    languageAskForObjectDelta({ chat, question, object }: {
        chat: string[] | undefined;
        question: string;
        object: any;
    }): Promise<any>;
}
