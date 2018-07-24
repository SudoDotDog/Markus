/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from 'bson';
import * as Crypto from 'crypto';
import * as Fs from 'fs';
import * as Path from 'path';
import { IImageCallback, IImageListResponse, IImageUserFriendlyCallback } from '../database/interface/image';
import { IFileModel } from '../database/model/file';
import { IImageModel } from '../database/model/image';
import { ITagModel } from '../database/model/tag';
import Config from '../markus';
import { error, ERROR_CODE } from './error';

export const createTempFile = (content: string, type: string): string => {
    const tempPath: string = Path.join(Config.imagePath, 'temp');
    mkPathDir(tempPath);

    const filePath: string = Path.join(tempPath, unique(11) + '.' + type);
    Fs.writeFileSync(filePath, content);

    return filePath;
};

export const mergeArray: <T>(original: T[], target: T[]) => T[] = <T>(original: T[], target: T[]) => {
    const tempArray: T[] = [...original];
    for (let i of target) {
        if (!original.map((element) => element.toString()).includes(i.toString())) {
            tempArray.push(i);
        }
    }
    return tempArray;
};

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

export const imageModelToImageListResponse = (image: IImageModel): IImageListResponse => {
    return {
        active: image.active,
        id: image.id,
        createdAt: image.createdAt,
        tags: image.tags.map((id: ObjectID) => id.toString()),
    };
};

export const buildImageCallback = (image: IImageModel, file: IFileModel): IImageCallback => {
    return {
        id: image.id,
        createdAt: image.createdAt,
        encoding: file.encoding,
        mime: file.mime,
        original: file.original,
        path: file.path,
        size: file.size,
        tags: image.tags.map((id: ObjectID) => id.toString()),
    };
};

export const buildImageUserFriendlyCallback = (image: IImageModel, tags: ITagModel[]): IImageUserFriendlyCallback => {
    return {
        id: image._id,
        createdAt: image.createdAt,
        tags: tags.map((tag) => tag.name),
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
    const exist: boolean = Fs.existsSync(path);
    if (!exist) {
        Fs.mkdirSync(path);
    }
};

export const hashBuffer = (buffer: Buffer): string => {
    const fsHash: Crypto.Hash = Crypto.createHash('md5');
    return fsHash.update(buffer).digest('hex');
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
