/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Json error handler
 */

import { error, ERROR_CODE } from "#/util/error/error";
import { RESPONSE } from "#/util/interface";
import { Express, NextFunction, Request, Response } from "express";
import { IExpressExtension } from '../interface';
import { preMount } from "../decorator";

export default class ExtensionJsonErrorHandler implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Json-Error-Handler';
    public readonly preMount: boolean = true;

    public available() {
        return true;
    }

    public install(app: Express) {
        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof SyntaxError) {
                res.status(400).send({
                    status: RESPONSE.FAILED,
                    error: error(ERROR_CODE.REQUEST_APPLICATION_JSON_CANNOT_PARSE),
                });
            } else {
                next();
            }
        });
    }
}
