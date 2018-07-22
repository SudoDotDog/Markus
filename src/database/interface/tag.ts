/**
 * @author WMXPY
 * @fileoverview Tag Interface
 */

export interface ITagConfig {
    name: string;
}

export interface ITag extends ITagConfig {
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}
