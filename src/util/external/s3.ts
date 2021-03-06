/**
 * @author WMXPY
 * @deprecated External Utils
 * @fileoverview Amazon S3
 */

import { error, ERROR_CODE } from "../error/error";

export const s3ExternalFilePathBuilder = (folder: string, filename: string) => {
    if (!global.Markus.Config.S3) {
        throw error(ERROR_CODE.AMAZON_S3_CONFIG_NOT_FOUND);
    }
    const getPath = global.Markus.Config.S3.getPath;
    return getPath + folder + '-' + filename;
};

export const s3ExternalFileKeyBuilder = (folder: string, filename: string) => {
    return folder + '-' + filename;
};
