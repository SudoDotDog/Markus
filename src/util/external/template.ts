/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config Templates
 */

import { IConfigTemplate, IConfig } from "../../interface";

export const getMarkusConfigTemplate = (): IConfigTemplate => {
    return {
        crossOrigin: 11,
        host: 1,
        database: 1,
        imagePath: 1,
        tempPath: 1,
        imagePFolder: 1,
        isDebug: 1,
        maxThread: 1,
        uploadLimit: 1,
        portNumber: 1,
        verbose: 1,
        white404ImagePath: 1,
        black404ImagePath: 1,
        mode: 1,
        S3_bucket: 11,
        S3_accessKeyId: 11,
        S3_secretAccessKey: 11,
        S3_getPath: 11,
    }
};

export const checkIsInTemplate = (element: string): boolean => {
    const template: IConfigTemplate = getMarkusConfigTemplate();
    for (let key in template) {
        if (element === key) {
            return true;
        }
    }
    return false;
}

export const checkConfigTemplate = (conf: Partial<IConfig>): boolean => {
    const template: IConfigTemplate = getMarkusConfigTemplate();
    for (let key in conf) {
        (template as any)[key]++;
    }
    for (let key in template) {
        if ((template as any)[key] <= 1) {
            return false;
        }
    }
    return true;
};

export const verifyMarkusConfigKey = (key: string): boolean => {
    return true;
};
