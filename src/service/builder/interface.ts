/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

import { Express, RequestHandler } from "express";
import { IConfig } from "../../markus";

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
    readonly mode: any;

    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly stack: RequestHandler[];
    readonly after: boolean;

    available: (route: IConfig) => boolean;
}

export interface IExpressHeader {
    name: string;
    value: string;
}
