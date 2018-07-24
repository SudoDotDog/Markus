/**
 * @author WMXPY
 * @fileoverview File Interface
 */

export interface IFileConfig {
    encoding: string;
    hash: string;
    mime: string;
    original: string;
    path: string;
    size: number;
}

export interface IFile extends IFileConfig {
    active: boolean;
    createdAt: Date;
    reference: number;
    updatedAt: Date;
}
