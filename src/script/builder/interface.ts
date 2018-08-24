/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Interfaces
 */

export interface IExpressBuilder {
    route: (route: IExpressRoute) => IExpressBuilder;
    routes: (routes: IExpressRoute[]) => IExpressBuilder;
    flush: () => void;
}

export enum ROUTE_MODE {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT',
    ALL = 'ALL',
}

export interface IExpressRoute {
    readonly path: string;
    readonly mode: any;

    readonly before: boolean;
    readonly authorization: boolean;
    readonly stack: any[];
    readonly after: boolean;

    available: (route: ROUTE_MODE) => boolean;
}
