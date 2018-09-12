/**
 * @author WMXPY
 * @fileoverview Direct Interface
 */

export interface IDirectConfig {
    folder: string;
    filename: string;
    name: string;
    ctime?: Date;
}

export interface IDirect extends IDirectConfig {
    active: boolean;
    ctime: Date;
    createdAt: Date;
    hash: string;
    reference: number;
    updatedAt: Date;
    size: number;
    status: boolean;
}
