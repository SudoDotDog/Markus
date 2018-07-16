/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import * as Fs from 'fs';
import * as Multer from 'multer';
import * as Path from 'path';
import Config from '../config/config';
import { error, ERROR_CODE } from './error';

export const uniqueSmall = (): string => {
    return '_' + Math.random().toString(36).substring(2, 9);
};

export const unique = (len?: number) => {
    if (len) {
        if (len > 12 || len < 0) {
            return uniqueSmall();
        }

        const left = Math.random().toString(36);
        const right = Math.random().toString(36);
        return '_' + ((left + right).substring(2, 2 + len));
    } else {
        return uniqueSmall();
    }
};

export const mkPathDir = (path: string) => {
    Fs.mkdirSync(path);
};

export const Upload = (): Multer.Instance => {
    let count = 0;
    let currentPath = Path.join(Config.imagePath, unique(7));
    mkPathDir(currentPath);

    const storage = Multer.diskStorage({
        destination: (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
            if (count++ >= Config.imagePFolder) {
                count = 0;
                currentPath = Path.join(Config.imagePath, unique(7));
                mkPathDir(currentPath);
            }
            callback(null, currentPath);
        },
        filename: (req: any, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
            const type = file.mimetype.split('/')[1];
            callback(null, unique(10) + '.' + type);
        },
    });

    return Multer({
        storage,
    });
};

export const UploadWithBase64 = (): ((base64: string) => Promise<string>) => {
    let count = 0;
    let currentPath = Path.join(Config.imagePath, unique(7));
    mkPathDir(currentPath);

    return (base64: string): Promise<string> => {
        if (count++ >= Config.imagePFolder) {
            count = 0;
            currentPath = Path.join(Config.imagePath, unique(7));
            mkPathDir(currentPath);
        }
        return new Promise<string>((resolve: (value: string) => void, reject: (error: Error) => void) => {
            const splited = base64.split(';');
            const type = splited[0].split('/')[1];
            const filePath = Path.join(currentPath, unique(10) + '.' + type);
            const data = splited[1].replace(/^base64,/, "");
            Fs.writeFile(filePath, new Buffer(data, 'base64'), (err) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve(filePath);
            });
        });
    };
};
