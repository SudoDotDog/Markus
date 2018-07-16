/**
 * @author WMXPY
 * @fileoverview Image Interface
 */

export interface IImageConfig {
    encoding: string;
    mime: string;
    original: string;
    path: string;
    size: number;
}

export interface IImage extends IImageConfig {
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IImageCallback {
    createdAt: Date;
    encoding: string;
    mime: string;
    original: string;
    path: string;
    size: number;
}
