/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import * as Multer from 'multer';
import * as Path from 'path';
import Config from '../config/config';
import * as Fs from 'fs';

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

export const Upload = () => {
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
