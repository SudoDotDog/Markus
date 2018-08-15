/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from 'bson';
import * as Fs from 'fs';
import { IImageCallback, IImageListResponse, IImageUserFriendlyCallback } from '../database/interface/image';
import { IFileModel } from '../database/model/file';
import { IImageModel } from '../database/model/image';
import { ITagModel } from '../database/model/tag';
import { mkPathDir } from './data/file';
import { fileBuilder, tempPath } from './data/path';

export const createTempFile = (content: string, type: string): string => {
    const tempFilePath: string = tempPath();
    mkPathDir(tempFilePath);

    const filePath: string = fileBuilder('temp', unique(11) + '.' + type);
    Fs.writeFileSync(filePath, content);

    return filePath;
};

export const determineIsImageByExtName = (extName: string): boolean => {
    if (extName.substring(0, 1) === '.') {
        extName = extName.substring(1, extName.length);
    }

    if (extName === 'jpg'
        || extName === 'jpeg'
        || extName === 'png'
        || extName === 'gif'
        || extName === 'webp') {
        return true;
    }
    return false;
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
        path: fileBuilder(file.folder, file.filename),
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
