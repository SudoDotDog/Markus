/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Body Parser Json
 */

import * as bodyParser from "body-parser";
import { Express } from "express";
import { IExpressExtension } from '../interface';

export default class ExtensionBodyParserJson implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Body-Parser-Json';
    public readonly preMount: boolean = true;

    private _limit: number;

    public constructor(uploadLimit: number) {
        this._limit = uploadLimit;
    }

    public available() {
        return true;
    }

    public install(app: Express) {
        app.use(bodyParser.json({
            limit: this._limit + 'mb',
        }));
    }
}
