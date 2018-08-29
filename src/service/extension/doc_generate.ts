/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Doc Generate
 */

import { Express } from "express";
import { DocIndexHandler } from "../../doc/handler";
import { IExpressExtension } from '../interface';

export default class ExtensionDocGenerate implements IExpressExtension {
    public readonly name: string = 'ME@Internal:Doc-Generate';
    public readonly preMount: boolean = false;

    public available() {
        if (global.MarkusConfig.isDebug) {
            return true;
        }
        return false;
    }

    public install(app: Express) {
        app.get('/doc', DocIndexHandler);
    }
}
