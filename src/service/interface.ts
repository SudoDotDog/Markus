/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

import { Express, RequestHandler } from "express";
import { MARKUS_AUTHORIZATION_ROLE } from "../declare/interface";
import Log from '../log/log';

export interface IExpressBuilder {
    app: Express;

    route: (route: IExpressRoute) => IExpressBuilder;
    routes: (routes: IExpressRoute[]) => IExpressBuilder;
    header: (name: string, value: string) => IExpressBuilder;

    flush: () => void;
}

export enum ROUTE_MODE {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT',
    ALL = 'ALL',
}

export enum EXPRESS_POST_SUBMIT_FORMAT {
    FORM_DATA = 'FORM_DATA',
    X_WWW_FORM_URLENCODED = 'X_WWW_FORM_URLENCODED',
}

export type ExpressNextFunction = () => void;

export type ExpressAssertionType = {
    type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY;
    child: ExpressAssertionType;
    split?: string;
    optional?: boolean;
} | {
    type: EXPRESS_ASSERTION_TYPES_UNION.OBJECT;
    child: IExpressAssertionJSONType;
    optional?: boolean;
} | {
    type: EXPRESS_ASSERTION_TYPES_END;
    optional?: boolean;
}| {
    type: EXPRESS_ASSERTION_TYPES_END;
    optional?: boolean;
};
export interface IExpressAssertionJSONType {
    [key: string]: ExpressAssertionType;
}

export enum EXPRESS_ASSERTION_TYPES_UNION {
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
}

export enum EXPRESS_ASSERTION_TYPES_END {
    ANY = 'ANY',
    BUFFER = 'BUFFER',
    STRING = 'STRING',
    OBJECT_ID = "OBJECT_ID",
    TOOL_NAME = "TOOL_NAME",
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
    FILE = 'FILE',
}

export enum EXPRESS_SPECIAL_MARK {
    DEPRECATED = 'DEPRECATED',
    REMOVED = 'REMOVED',
    RISKY = 'RISKY',
    WARNING = 'WARNING',
    DEBUG = 'DEBUG',
}

export interface IExpressHeader {
    name: string;
    value: string;
}

export enum EXPRESS_EXAMPLE_CODE {
    NODEJS_FORM_DATA = "NODEJS_FORM_DATA",
    FETCH_FORM_DATA = "FETCH_FORM_DATA",
    HTML = "HTML",
    ANDROID = "ANDROID",
    IOS_SWIFT = "IOS_SWIFT",
}

export interface IExpressRoute {
    readonly name: string;
    readonly path: string;
    readonly mode: ROUTE_MODE;

    readonly authRole?: MARKUS_AUTHORIZATION_ROLE[];
    readonly veryBefore?: RequestHandler[];
    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly stack: RequestHandler[];
    readonly after: boolean;

    readonly ignoreInDoc?: boolean;
    readonly postType?: EXPRESS_POST_SUBMIT_FORMAT;
    readonly assertBody?: IExpressAssertionJSONType;
    readonly assertParam?: IExpressAssertionJSONType;
    readonly assertQuery?: IExpressAssertionJSONType;
    readonly assertResponse?: IExpressAssertionJSONType;
    readonly exampleCode?: EXPRESS_EXAMPLE_CODE[];
    readonly specialMark?: EXPRESS_SPECIAL_MARK[];
    readonly doc?: IDocInformation | null;

    available: () => boolean;
    setLog: (log: Log) => void;
}

export interface IExpressExtension {
    readonly name: string;
    readonly preMount: boolean;

    available: () => boolean;
    install: (app: Express) => void;
}

export interface IText {
    EN: string;
    ZH?: string;
}

export interface IDocInformation {
    name: IText;
    description: IText;
}
