/**
 * @author WMXPY
 * @fileoverview Management Utils Save
 */

import * as Fs from 'fs';
import { mkPathDir } from '../data/file';
import { fileBuilder, pathBuilder } from '../data/path';
import { error, ERROR_CODE } from '../error';
import { IFileLink } from './file/interface';

export const saveImageByBuffer = (folder: string, filename: string, buffer: Buffer): Promise<IFileLink> => {
    return new Promise<IFileLink>((resolve: (link: IFileLink) => void, reject: (error: Error) => void) => {
        mkPathDir(pathBuilder(folder));
        const filepath: string = fileBuilder(folder, filename);
        Fs.writeFile(filepath, buffer, (err: Error) => {
            if (err) {
                reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
            }
            resolve({
                folder,
                filename,
            });
        });
    });
};
