/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc Interface
 */

import { IDocInformation, ROUTE_MODE } from "../service/interface";

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
    value: string;
    important?: DOC_TABLE_ELEMENT_IMPORTANT_LEVEL;
}

export interface IDocTemplateRenderer {
    build: () => string;
}
