/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Doc Generate
 */

import { Express, Request, Response } from "express";
import { createDocIndex, verifyLanguage } from "../../doc/handler";
import Log from "../../log/log";
import { IExpressExtension, IText } from '../interface';

export default class ExtensionDocGenerate implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Doc-Generate';
    public readonly preMount: boolean = false;

    private _log: Log;
    private _docs: {
        [key: string]: string;
    };

    public constructor(log: Log) {
        this._log = log;
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
        this._log.verbose('Document attempted');
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
            this._log.info(`Document served from cache`);
            return this._docs[lang];
        }
        const doc: string = this.flushDoc(language);
        this._docs[lang] = doc;
        return doc;
    }

    private flushDoc(language: keyof IText): string {
        const resString: string = createDocIndex(language);
        this._log.info(`Document served from generation, length: ${resString.length}`);
        return resString;
    }
}
