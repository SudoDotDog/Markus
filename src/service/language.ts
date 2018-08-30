/**
 * @author WMXPY
 * @description Util
 * @fileoverview Language Processor
 */

import { IText } from "./interface";

export default class LanguageTextProcessor {
    private _language: keyof IText;

    public constructor(language: string | keyof IText | undefined) {
        if (language) {
            language = language.toUpperCase();
            if (this.checkKeyOf(language)) {
                this._language = (language as keyof IText);
            } else {
                this._language = 'EN';
            }
        } else {
            this._language = 'EN';
        }
    }

    public from(text: IText): string {
        if (text[this._language]) {
            return (text[this._language] as string);
        }
        return text.EN;
    }

    protected checkKeyOf(language: string): boolean {
        const keys: Array<keyof IText> = [
            'EN',
            'ZH',
        ];

        return keys.includes(language as any);
    }
}
