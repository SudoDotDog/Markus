/**
 * @author WMXPY
 * @fileoverview Markus Static Configs
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import * as Path from 'path';
import { IConfig, middleware, MODE } from './interface';
import * as Handler from './script/handlers/import';
import * as InternalTools from './toolbox/import';
import { IMarkusTool } from './toolbox/toolbox';

const Tools: IMarkusTool[] = [
    new InternalTools.InternalToolTagDeduplicate(),
    new InternalTools.InternalEnvironmentInformation(),
    new InternalTools.InternalFullBackup(),
];

const PreparesMiddleware: middleware[] = [];
const PermissionsMiddleware: middleware[] = [
    Handler.Auth.validPermissionBasicAuthMiddleware,
    Handler.Auth.validPermissionBodyMiddleware,
    Handler.Auth.validPermissionQueryMiddleware,
];
const AfterMiddleware: middleware[] = [];

const Config: IConfig = {
    host: 'mongodb://localhost:27017',
    database: 'markus-test-2',
    imagePath: '/Users/mwang/Desktop/image',
    tempPath: '/Users/mwang/Desktop/temp',
    imagePFolder: 5,
    isDebug: true,
    maxThread: 4,
    uploadLimit: 25,
    portNumber: 8080,
    verbose: false,
    white404ImagePath: Path.resolve('assets/404image_white.png'),
    black404ImagePath: Path.resolve('assets/404image_black.png'),
    mode: MODE.FILE_SYSTEM,
    middleware: {
        prepares: PreparesMiddleware,
        permissions: PermissionsMiddleware,
        after: AfterMiddleware,
    },
    tools: Tools,
};

export default Config;
