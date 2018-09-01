/**
 * @author WMXPY
 * @fileoverview Avatar Interface
 */

import { ObjectID } from "bson";
import { IFileManager } from "../../util/manager/file/import";

export interface IAvatarConfig {
    avatar: string;
    file: ObjectID;
}

export interface IAvatar extends IAvatarConfig {
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAvatarCreationConfig {
    ctime?: Date;
    avatar: string;
    encoding: string;
    hash: string;
    mime: string;
    original: string;
    manager: IFileManager;
    size: number;
}

export interface IAvatarCallback {
    avatar: string;
    path: string;
}
