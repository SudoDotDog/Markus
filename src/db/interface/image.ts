/**
 * @author WMXPY
 * @fileoverview Image Interface
 */

export interface IImageConfig {
    path: string;
}

export interface IImage extends IImageConfig {
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
