/**
 * @author WMXPY
 * @fileoverview File Interface
 */

export interface IFileProperty {
    encoding: string;
    mime: string;
    original: string;
    size: number;
}

export interface IFileConfig extends IFileProperty {
    folder: string;
    filename: string;
    hash: string;
    ctime?: Date;
}

export interface IFile extends IFileConfig {
    active: boolean;
    createdAt: Date;
    direct: boolean;
    reference: number;
    updatedAt: Date;
}
