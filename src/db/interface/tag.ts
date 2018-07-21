/**
 * @author WMXPY
 * @fileoverview Tag Interface
 */

export interface ITagConfig {
    name: string;
}

export interface ITag extends ITagConfig {
    count: number;
    createdAt: Date;
    prefix: string;
    stepper: number;
    updatedAt: Date;
}
