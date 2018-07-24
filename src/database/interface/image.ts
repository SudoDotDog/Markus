/**
 * @author WMXPY
 * @fileoverview Image Interface
 */

import { ObjectID } from "bson";
import { IFileManager } from "../../util/manager/file/import";

export interface IImageCreationConfig {
    encoding: string;
    hash: string;
    mime: string;
    original: string;
    manager: IFileManager;
    size: number;
    tags: string[];
}

export interface IImageConfig {
    tags?: ObjectID[];
    file: ObjectID;
}

export interface IImage extends IImageConfig {
    active: boolean;
    createdAt: Date;
    tags: ObjectID[];
    updatedAt: Date;
}

export interface IImageCallback {
    id: ObjectID;
    createdAt: Date;
    encoding: string;
    mime: string;
    original: string;
    path: string;
    size: number;
    tags: string[];
}

export interface IImageUserFriendlyCallback {
    id: ObjectID;
    createdAt: Date;
    tags: string[];
}

export interface IImageListResponse {
    active: boolean;
    id: ObjectID;
    createdAt: Date;
    tags: string[];
}
