/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Doc Generate
 */

import { Express, Request, Response } from "express";
import { createDocIndex, createSubDocIndex, verifyLanguage } from "../../doc/handler";
import Log from "../../plugin/log/log";
import { IExpressExtension, IText } from '../interface';

export default class ExtensionDocGenerate implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Doc-Generate';
    public readonly preMount: boolean = false;

    private _log: Log;
    private _docs: {
        [key: string]: string;
    };
    private _subDocs: {
        [key: string]: {
            [key: string]: string;
        };
    };

    public constructor(log: Log) {
        this._log = log;
        this._docs = {};
        this._subDocs = {};

        this.rummageDoc = this.rummageDoc.bind(this);
        this.rummageSubDoc = this.rummageSubDoc.bind(this);
        this.flushDoc = this.flushDoc.bind(this);
        this.flushDubDoc = this.flushDubDoc.bind(this);

        this.handler = this.handler.bind(this);
        this.subHandler = this.subHandler.bind(this);
    }

    public available() {
        if (global.Markus.Config.documentation) {
            return true;
        }
        return false;
    }

    public install(app: Express) {
        app.get('/doc', this.handler);
        app.get('/doc/:name', this.subHandler);
    }

    private handler(req: Request, res: Response): void {
        let language: string | undefined = req.query.language;
        if (!verifyLanguage(language)) {
            language = 'EN';
        }

        const doc: string = this.rummageDoc(language as keyof IText);
        res.send(doc);
    }

    private subHandler(req: Request, res: Response): void {
        const url: string = req.protocol + '://' + req.hostname;
        let language: string | undefined = req.query.language;
        const name: string = req.params.name;
        if (!verifyLanguage(language)) {
            language = 'EN';
        }

        const doc: string = this.rummageSubDoc(name, language as keyof IText, url);
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

    private rummageSubDoc(name: string, language: keyof IText, url: string): string {
        const lang: string = language.toUpperCase();
        if (this._subDocs[lang]) {
            if (this._subDocs[lang][name]) {
                this._log.info(`Sub Document ${name} served from cache`);
                return this._subDocs[lang][name];
            }
        } else {
            this._subDocs[lang] = {};
        }
        const doc: string = this.flushDubDoc(name, language, url);
        this._subDocs[lang][name] = doc;
        return doc;
    }

    private flushDoc(language: keyof IText): string {
        const resString: string = createDocIndex(language);
        this._log.info(`Document served from generation, length: ${resString.length}`);
        return resString;
    }

    private flushDubDoc(name: string, language: keyof IText, url: string): string {
        const resString: string = createSubDocIndex(name, language, url);
        this._log.info(`Sub Document ${name} served from generation, length: ${resString.length}`);
        return resString;
    }
}
