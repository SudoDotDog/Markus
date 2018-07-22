/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import * as Crypto from 'crypto';
import * as Fs from 'fs';
import * as Multer from 'multer';
import * as Path from 'path';
import { ObjectID } from '../../node_modules/@types/bson';
import { IImageCallback } from '../database/interface/image';
import { IFileModel } from '../database/model/file';
import { IImageModel } from '../database/model/image';
import Config from '../markus';
import { error, ERROR_CODE } from './error';

export const combineTagsArray = (original: string[], target: string[]): string[] => {
    const tempArray: string[] = [...original];
    for (let i of target) {
        if (original.indexOf(i) === -1) {
            tempArray.push(i);
        }
    }
    return tempArray;
};

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

// export const imageModelToImageListResponse = (image: IImageModel): IImageListResponse => {
//     return {
//         active: image.active,
//         id: image.id,
//         createdAt: image.createdAt,
//         original: image.original,
//         size: image.size,
//         tags: image.tags,
//     };
// };

// export const imageModelToImageListResponseAdmin = (image: IImageModel): IImageListResponseAdmin => {
//     return {
//         active: image.active,
//         id: image.id,
//         createdAt: image.createdAt,
//         hash: image.hash,
//         original: image.original,
//         size: image.size,
//         tags: image.tags,
//     };
// };

export const buildImageCallback = (image: IImageModel, file: IFileModel): IImageCallback => {
    return {
        createdAt: image.createdAt,
        encoding: file.encoding,
        mime: file.mime,
        original: file.original,
        path: file.path,
        size: file.size,
        tags: image.tags.map((id: ObjectID) => id.toString()),
    };
};

export const uniqueSmall = (): string => {
    return '_' + Math.random().toString(36).substring(2, 9);
};

export const unique = (len?: number) => {
    if (len) {
        if (len > 12 || len < 0) {
            return uniqueSmall();
        }

        const left: string = Math.random().toString(36);
        const right: string = Math.random().toString(36);
        return '_' + ((left + right).substring(2, 2 + len));
    } else {
        return uniqueSmall();
    }
};

export const mkPathDir = (path: string) => {
    Fs.mkdirSync(path);
};

export const hashImage = (imagePath: string): Promise<string> => {
    const stream: Fs.ReadStream = Fs.createReadStream(imagePath);
    const fsHash: Crypto.Hash = Crypto.createHash('md5');

    return new Promise<string>((resolve: (md5: string) => void, reject: (reason: Error) => void) => {
        stream.on('data', (dataChunk: any) => {
            fsHash.update(dataChunk);
        });

        stream.on('end', () => {
            const md5: string = fsHash.digest('hex');
            resolve(md5);
        });

        stream.on('close', (err: Error) => {
            reject(err);
        });
    });
};

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
            const type = file.mimetype.split('/')[1];
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
            Fs.writeFile(filePath, new Buffer(data, 'base64'), (err: Error) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve(filePath);
            });
        });
    };
};
