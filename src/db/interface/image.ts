/**
 * @author WMXPY
 * @fileoverview Image Interface
 */

import { ObjectID } from "../../../node_modules/@types/bson";

export interface IImageConfig {
    encoding: string;
    hash: string;
    mime: string;
    original: string;
    path: string;
    size: number;
    tags?: string[];
}

export interface IImage extends IImageConfig {
    active: boolean;
    createdAt: Date;
    tags: string[];
    updatedAt: Date;
}

export interface IImageCallback {
    createdAt: Date;
    encoding: string;
    mime: string;
    original: string;
    path: string;
    size: number;
    tags: string[];
}

export interface IImageListResponse {
    active: boolean;
    id: ObjectID;
    createdAt: Date;
    original: string;
    size: number;
    tags: string[];
}
