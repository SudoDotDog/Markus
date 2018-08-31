/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

import { Express, RequestHandler } from "express";

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
    JSON = 'JSON',
}

export type ExpressNextFunction = () => void;

interface IPrivateExpressAssertionTypeUNION {
    name: string;
    type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY | EXPRESS_ASSERTION_TYPES_UNION.OBJECT;
    child: ExpressAssertionType;
    optional?: boolean;
}

interface IPrivateExpressAssertionTypeNamedEND {
    name?: string;
    type: EXPRESS_ASSERTION_TYPES_END.STRING | EXPRESS_ASSERTION_TYPES_END.BOOLEAN | EXPRESS_ASSERTION_TYPES_END.NUMBER | EXPRESS_ASSERTION_TYPES_END.FILE;
    optional?: boolean;
}

type ExpressAssertionType = IPrivateExpressAssertionTypeUNION | IPrivateExpressAssertionTypeNamedEND;
export interface IExpressAssertionJSONType {
    [key: string]: EXPRESS_ASSERTION_TYPES_END | {
        type: EXPRESS_ASSERTION_TYPES_UNION;
        child: IExpressAssertionJSONType;
        optional?: boolean;
    } | {
        type: EXPRESS_ASSERTION_TYPES_END;
        optional?: boolean;
    };
}

export enum EXPRESS_ASSERTION_TYPES_UNION {
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
}

export enum EXPRESS_ASSERTION_TYPES_END {
    STRING = 'STRING',
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

export interface IExpressRoute {
    readonly name: string;
    readonly path: string;
    readonly mode: ROUTE_MODE;

    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly stack: RequestHandler[];
    readonly after: boolean;

    readonly ignoreInDoc?: boolean;

    readonly postType?: EXPRESS_POST_SUBMIT_FORMAT;
    readonly assertBody?: IExpressAssertionJSONType;
    readonly assertQuery?: IExpressAssertionJSONType;
    readonly assertResponse?: IExpressAssertionJSONType;
    readonly specialMark?: EXPRESS_SPECIAL_MARK[];

    readonly doc?: IDocInformation | null;

    available: () => boolean;
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
