/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

import { Express, RequestHandler } from "express";
import { IConfig } from "../markus";

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

export interface IExpressRoute {
    readonly path: string;
    readonly mode: ROUTE_MODE;

    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly stack: RequestHandler[];
    readonly after: boolean;

    available: (config: IConfig) => boolean;
}

export interface IExpressHeader {
    name: string;
    value: string;
}

export interface IExpressExtension {
    readonly name: string;
    readonly preMount: boolean;

    available: (config: IConfig) => boolean;
    install: (app: Express) => void;
}
