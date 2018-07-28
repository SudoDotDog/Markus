/**
 * @author WMXPY
 * @fileoverview Data File Utils
 */

import * as Fs from 'fs';
import { IFileModel } from "../../database/model/file";
import { error, ERROR_CODE } from "../error";
import { fileBuilder } from './path';

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
    await releaseStorage(fileBuilder(file.folder, file.filename));
    return;
};

export const mkPathDir = (path: string) => {
    const exist: boolean = Fs.existsSync(path);
    if (!exist) {
        Fs.mkdirSync(path);
    }
};
