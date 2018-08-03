/**
 * @author WMXPY
 * @fileoverview Markus Static Configs & Interfaces
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import { NextFunction, Request, Response } from 'express';
import * as Path from 'path';
import { error, ERROR_CODE, handlerError } from './util/error';

export type middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

interface IConfig {
    crossOrigin: string;
    host: string;
    database: string;
    imagePath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number; // keep
    uploadLimit: number;
    portNumber: number;
    verbose: boolean;
    white404ImagePath: string;
    black404ImagePath: string;
    middleware: { // keep
        prepares: middleware[];
        permissions: middleware[];
    };
}

const validPermissionMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (req.body.key) {
        if (req.body.key === 'test') {
            req.valid = true;
        } else {
            req.valid = false;
        }
        next();
        return;
    } else {
        handlerError(res, error(ERROR_CODE.PERMISSION_VALID_FAILED));
    }
};

const Config: IConfig = {
    crossOrigin: '*',
    host: 'mongodb://localhost',
    database: 'markus-test-2',
    imagePath: '/Users/Desktop/test',
    imagePFolder: 5,
    isDebug: true,
    maxThread: 4,
    uploadLimit: 25,
    portNumber: 8080,
    verbose: false,
    white404ImagePath: Path.resolve('assets/404image_white.png'),
    black404ImagePath: Path.resolve('assets/404image_black.png'),
    middleware: {
        prepares: [],
        permissions: [validPermissionMiddleware],
    },
};

export default Config;
