/**
 * @author WMXPY
 * @fileoverview Data Path Utils
 */
// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import * as Path from 'path';

export const tempPath = (): string => {
    return global.MarkusConfig.tempPath;
};

export const pathBuilder = (folder: string, imagePath?: string): string => {
    if (imagePath) {
        return Path.join(imagePath, folder);
    } else {
        return Path.join(global.MarkusConfig.imagePath, folder);
    }
};

export const fileBuilder = (folder: string, fileName: string, imagePath?: string): string => {
    if (imagePath) {
        return Path.join(imagePath, folder, fileName);
    } else {
        return Path.join(global.MarkusConfig.imagePath, folder, fileName);
    }
};

export const concatSuffix = (original: string, suffix: string) => {
    if (!suffix || suffix.length < 1) {
        return original;
    }
    const parsed: string = suffix.substring(0, 1).toUpperCase() + suffix.substring(1, suffix.length).toLowerCase();
    return original + '-' + parsed;
};
