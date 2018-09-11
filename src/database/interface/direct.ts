/**
 * @author WMXPY
 * @fileoverview Direct Interface
 */

export interface IDirectConfig{
    folder: string;
    filename: string;
    name: string;
    hash: string;
    ctime?: Date;
    size: number;
}

export interface IDirect extends IDirectConfig {
    active: boolean;
    ctime: Date;
    createdAt: Date;
    reference: number;
    updatedAt: Date;
    status: boolean;
}
