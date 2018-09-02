/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Doc Generate
 */

import { Express, Request, Response } from "express";
import { createDocIndex, verifyLanguage } from "../../doc/handler";
import { IExpressExtension, IText } from '../interface';

export default class ExtensionDocGenerate implements IExpressExtension {
    public readonly name: string = 'ME@Internal:Extension^Doc-Generate';
    public readonly preMount: boolean = false;

    private _docs: {
        [key: string]: string;
    };

    public constructor() {
        this._docs = {};
        this.handler = this.handler.bind(this);
        this.rummageDoc = this.rummageDoc.bind(this);
        this.flushDoc = this.flushDoc.bind(this);
    }

    public available() {
        if (global.MarkusConfig.isDebug) {
            return true;
        }
        return false;
    }

    public install(app: Express) {
        app.get('/doc', this.handler);
    }

    private handler(req: Request, res: Response): void {
        let language: string | undefined = req.query.language;
        if (!verifyLanguage(language)) {
            language = 'EN';
        }

        const doc: string = this.rummageDoc(language as keyof IText);
        res.send(doc);
    }

    private rummageDoc(language: keyof IText): string {
        const lang: string = language.toUpperCase();
        if (this._docs[lang]) {
            return this._docs[lang];
        }
        const doc: string = this.flushDoc(language);
        this._docs[lang] = doc;
        return doc;
    }

    private flushDoc(language: keyof IText): string {
        return createDocIndex(language);
    }
}
