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

export interface ITagUserFriendly {
    name: string;
    count: number;
    createdAt: Date;
}

export interface ITagUserFriendlyAdvanced extends ITagUserFriendly {
    size: number;
    updatedAt: Date;
}
