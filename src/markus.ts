/**
 * @author WMXPY
 * @fileoverview Markus Static Configs
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import * as Path from 'path';
import { middleware } from './interface';
import * as Handler from './script/handlers/import';

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
        permissions: [Handler.Auth.validPermissionBasicAuthMiddleware],
    },
};

export default Config;
