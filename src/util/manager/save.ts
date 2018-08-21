/**
 * @author WMXPY
 * @fileoverview Management Utils Save
 */

import * as Fs from 'fs';
import Config, { MODE } from '../../markus';
import { mkPathDir } from '../data/file';
import { fileBuilder, pathBuilder } from '../data/path';
import { error, ERROR_CODE } from '../error/error';
import { IFileLink } from './file/interface';

export type ImageSaveFunction = (folder: string, filename: string, buffer: Buffer) => Promise<IFileLink>;

export const getSaveImageByBufferFunction = () => {
    if (Config.mode === MODE.AMAZON_S3) {
        return saveS3ImageByBuffer;
    }
    return saveImageByBuffer;
};

export const saveImageByBuffer: ImageSaveFunction = (folder: string, filename: string, buffer: Buffer): Promise<IFileLink> => {
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

export const saveS3ImageByBuffer: ImageSaveFunction = (folder: string, filename: string, buffer: Buffer): Promise<IFileLink> => {

};
