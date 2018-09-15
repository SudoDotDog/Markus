/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc Interface
 */

export interface IDocStyle {
    name: string;
    value: string;
}

export enum DOC_TABLE_ELEMENT_IMPORTANT_LEVEL {
    NORMAL = 0,
    MAJOR = 1,
    CRITICAL = 2,
}

export interface IDocTableElement {
    name: string;
    value: any;
    important?: DOC_TABLE_ELEMENT_IMPORTANT_LEVEL;
}

export interface IStaticResourceDocInformation {
    name: string;
}
