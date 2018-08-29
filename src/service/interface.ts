/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

import { Express, RequestHandler } from "express";
import { IConfig } from "../interface";

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

export type ExpressNextFunction = () => void;

interface IPrivateExpressAssertionTypeUNION {
    name: string;
    type: EXPRESS_ASSERTION_TYPES.ARRAY | EXPRESS_ASSERTION_TYPES.OBJECT;
    child: ExpressAssertionType;
}

interface IPrivateExpressAssertionTypeEND {
    name: string;
    type: EXPRESS_ASSERTION_TYPES.STRING | EXPRESS_ASSERTION_TYPES.BOOLEAN | EXPRESS_ASSERTION_TYPES.NUMBER;
}

export type ExpressAssertionType = IPrivateExpressAssertionTypeUNION | IPrivateExpressAssertionTypeEND;

export enum EXPRESS_ASSERTION_TYPES {
    STRING = 'STRING',
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
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

    readonly assertBody?: ExpressAssertionType[];
    readonly assertQuery?: ExpressAssertionType[];

    readonly doc?: IDocInformation;

    available: (config: IConfig) => boolean;
}

export interface IExpressExtension {
    readonly name: string;
    readonly preMount: boolean;

    available: (config: IConfig) => boolean;
    install: (app: Express) => void;
}

export interface IText {
    en: string;
    zh?: string;
}

export interface IDocInformation {
    name: IText;
    description: IText;
}
