/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Authorization
 */

// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import { NextFunction, Request, Response } from "express";
import { middleware } from "../../interface";
import { parseBasicAuthorization } from '../../util/data/auth';
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

export const validPermissionBodyMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.body.key) {
        if (req.body.key === 'test') {
            req.valid = true;
        } else {
            req.valid = false;
        }
        next();
        return;
    } else {
        res.status(401).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.PERMISSION_VALID_FAILED),
        });
    }
};

export const validPermissionBasicAuthMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader: string | undefined = req.header('authorization');
    const auth: string | null = parseBasicAuthorization(authHeader);

    if (auth) {
        req.valid = true;
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Key');
        res.status(401).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.PERMISSION_VALID_FAILED),
        });
    }
};
