/**
 * @author WMXPY
 * @description Deprecated
 * @fileoverview Deprecated Multer Utils
 */

import * as Fs from 'fs';
import * as Multer from 'multer';
import * as Path from 'path';
import Config from '../markus';
import { mkPathDir } from './data/file';
import { error, ERROR_CODE } from './error';
import { unique } from './image';

export const Upload = (): Multer.Instance => {
    let count: number = 0;
    let currentPath: string = Path.join(Config.imagePath, unique(9));
    mkPathDir(currentPath);

    const storage: Multer.StorageEngine = Multer.diskStorage({
        destination: (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
            if (count++ >= Config.imagePFolder) {
                count = 0;
                currentPath = Path.join(Config.imagePath, unique(9));
                mkPathDir(currentPath);
            }
            callback(null, currentPath);
        },
        filename: (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
            const type: string = file.mimetype.split('/')[1];
            callback(null, unique(11) + '.' + type);
        },
    });

    return Multer({
        storage,
    });
};

export const UploadWithBase64 = (): ((base64: string) => Promise<string>) => {
    let count: number = 0;
    let currentPath: string = Path.join(Config.imagePath, unique(9));
    mkPathDir(currentPath);

    return (base64: string): Promise<string> => {
        if (count++ >= Config.imagePFolder) {
            count = 0;
            currentPath = Path.join(Config.imagePath, unique(9));
            mkPathDir(currentPath);
        }
        return new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void) => {
            const splited: string[] = base64.split(';');
            const type: string = splited[0].split('/')[1];
            const filePath: string = Path.join(currentPath, unique(11) + '.' + type);
            const data: string = splited[1].replace(/^base64,/, "");
            const buffer: Buffer = Buffer.from(data, 'base64');
            Fs.writeFile(filePath, buffer, (err: Error) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve(filePath);
            });
        });
    };
};
