/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Authorization
 */

// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import { NextFunction, Request, Response } from "express";
import { MARKUS_AUTHORIZATION_ROLE } from "../../declare/interface";
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
        if (checkAuthFromConfig(key, req.authRole)) {
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
        if (checkAuthFromConfig(auth, req.authRole)) {
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
        if (checkAuthFromConfig(auth, req.authRole)) {
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

const checkAuthFromConfig = (key: string, roles?: MARKUS_AUTHORIZATION_ROLE[]): boolean => {
    const keys: {
        manage: string[];
        host: string[];
    } = global.MarkusConfig.authorization;
    if (!keys) {
        throw error(ERROR_CODE.PERMISSION_CONFIG_NOT_CORRECT);
    }
    if (!(keys.manage instanceof Array) ||
        !(keys.host instanceof Array)) {
        throw error(ERROR_CODE.PERMISSION_CONFIG_NOT_CORRECT);
    }

    if (roles) {
        if (!(roles instanceof Array)) {
            throw error(ERROR_CODE.PERMISSION_CONFIG_NOT_CORRECT);
        }
        for (let i of roles) {
            switch (i) {
                case MARKUS_AUTHORIZATION_ROLE.HOST:
                    if (keys.manage.includes(key)
                        || keys.host.includes(key)) {
                        return true;
                    }
                    return false;
                case MARKUS_AUTHORIZATION_ROLE.MANAGE:
                    if (keys.manage.includes(key)) {
                        return true;
                    }
                    return false;
                default:
                    return false;
            }
        }
        return false;
    } else {
        return keys.manage.includes(key) || keys.host.includes(key);
    }
};
