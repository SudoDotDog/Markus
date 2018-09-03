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
        if (checkAuthFromConfig(key, req.authPosition)) {
            req.valid = true;
        } else {
            req.valid = false;
        }
    } else {
        req.valid = false;
    }
    next();
    return;
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
        if (checkAuthFromConfig(auth, req.authPosition)) {
            req.valid = true;
        } else {
            req.valid = false;
        }
    } else {
        req.valid = false;
    }
    next();
    return;
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
        if (checkAuthFromConfig(auth, req.authPosition)) {
            req.valid = true;
        } else {
            req.valid = false;
        }
    } else {
        req.valid = false;
    }
    next();
    return;
};

const checkAuthFromConfig = (key: string, position?: number[]): boolean => {
    const keys: string[] = global.MarkusConfig.authorization;
    if (!(keys instanceof Array)) {
        throw error(ERROR_CODE.PERMISSION_CONFIG_NOT_CORRECT);
    }

    if (position) {
        if (!(position instanceof Array)) {
            throw error(ERROR_CODE.PERMISSION_CONFIG_NOT_CORRECT);
        }
        for (let i of position) {
            if (keys[i] === key) {
                return true;
            }
        }
        return false;
    } else {
        return keys.includes(key);
    }
}
