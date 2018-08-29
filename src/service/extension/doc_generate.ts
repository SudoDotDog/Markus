/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Doc Generate
 */

import { Express } from "express";
import { DocHandler, DocIndexHandler } from "../../doc/handler";
import { IConfig } from "../../interface";
import { IExpressExtension } from '../interface';

export default class ExtensionDocGenerate implements IExpressExtension {
    public readonly name: string = 'ME@Internal:Doc-Generate';
    public readonly preMount: boolean = false;

    public available(config: IConfig) {
        if (config.isDebug) {
            return true;
        }
        return false;
    }

    public install(app: Express) {
        app.get('/doc', DocIndexHandler);
    }
}
