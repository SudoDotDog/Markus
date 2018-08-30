/**
 * @author WMXPY
 * @fileoverview Markus Static Configs
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import * as Path from 'path';
import { middleware, MODE, IMarkusExtensionConfig, IConfig } from './interface';
import * as Handler from './script/handlers/import';
import * as InternalTools from './toolbox/import';
import { IMarkusTool } from './toolbox/toolbox';
import MarkusConfigReader from './util/external/conf';

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

export const initMarkusGlobalConfig = () => {
    if (global.MarkusConfig) {
        return;
    }

    const reader: MarkusConfigReader = new MarkusConfigReader();
    const config: IConfig = reader.read();

    global.MarkusConfig = config;
}

export const MarkusExtensionConfig: IMarkusExtensionConfig = {
    middleware: {
        prepares: PreparesMiddleware,
        permissions: PermissionsMiddleware,
        after: AfterMiddleware,
    },
    tools: Tools,
}
