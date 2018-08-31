/**
 * @author WMXPY
 * @description Doc
 * @fileoverview Doc Interface
 */

import { ExpressAssertionType, IDocInformation, ROUTE_MODE } from "../service/interface";

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

export interface IMarkusRouteInformation {
    readonly name: string;
    readonly path: string;
    readonly mode: ROUTE_MODE;
    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly after: boolean;
    readonly assertBody?: ExpressAssertionType[];
    readonly assertQuery?: ExpressAssertionType[];
    readonly doc?: IDocInformation;
}

export interface IDocTemplateRenderer {
    build: () => string;
}
