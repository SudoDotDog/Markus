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
import { error, ERROR_CODE } from "../../util/error/error";
import { RESPONSE } from '../../util/interface';

/**
 * Middleware
 * Valid permission by body post
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const validPermissionBodyMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.valid) {
        next();
        return;
    }

    const key: string | undefined = req.body.key;
    if (key) {
        if (key === 'test') {
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

/**
 * Middleware
 * Valid permission by header
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const validPermissionBasicAuthMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.valid) {
        next();
        return;
    }

    const authHeader: string | undefined = req.header('authorization');
    const auth: string | null = parseBasicAuthorization(authHeader);

    if (auth) {
        if (auth === 'test') {
            req.valid = true;
        } else {
            req.valid = false;
        }
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm=Key');
        res.status(401).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.PERMISSION_VALID_FAILED),
        });
    }
};

/**
 * Middleware
 * Valid permission by query
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const validPermissionQueryMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.valid) {
        next();
        return;
    }

    const auth: string | undefined = req.query.authorization;
    if (auth) {
        if (auth === 'test') {
            req.valid = true;
        } else {
            req.valid = false;
        }
        next();
    } else {
        res.status(401).send({
            status: RESPONSE.FAILED,
            error: error(ERROR_CODE.PERMISSION_VALID_FAILED),
        });
    }
};
