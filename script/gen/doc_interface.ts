/**
 * @author PCXPY
 * @description Doc
 * @fileoverview Interfaces
 */

import { RequestHandler } from "express";

export enum ROUTE_MODE {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT',
    ALL = 'ALL',
}

export interface IExpressRoute {
    readonly path: string;
    readonly mode: ROUTE_MODE;

    readonly prepare: boolean;
    readonly authorization: boolean;
    readonly stack: RequestHandler[];
    readonly after: boolean;

    available: (config: any) => boolean;
}
