/**
 * @author WMXPY
 * @fileoverview Data File Utils
 */

import { IFileModel } from "../../database/model/file";
import { error, ERROR_CODE } from "../error";
import * as Fs from 'fs';

export const releaseStorage = (path: string): Promise<void> => {
    return new Promise<void>((resolve: () => void, reject: (err: Error) => void) => {
        Fs.unlink(path, (err: Error | null): void => {
            if (err) {
                reject(error(ERROR_CODE.IMAGE_UNLINK_FAILED));
            }
            resolve();
        });
    });
};

export const touchDecrementAndRelease = async (file: IFileModel): Promise<void> => {
    file.refDecrement();
    if (file.touchRemove()) {
        await removeFile(file);
    }

    return;
};

export const removeFile = async (file: IFileModel): Promise<void> => {
    await releaseStorage(file.path);
    return;
};
