/**
 * @author WMXPY
 * @description Markus Plugin
 * @fileoverview Static
 */

import { I18N, I18N_LANGUAGE } from "#i18n/interface";

export default class StaticResource<T> {
    private _parsed: I18N<T>;

    public constructor(parsed: I18N<T>) {
        this._parsed = parsed;
    }

    public language(language: I18N_LANGUAGE): T {
        return this._parsed[language];
    }
}
