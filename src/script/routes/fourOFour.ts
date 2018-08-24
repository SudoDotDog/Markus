/**
 * @author WMXPY
 * @description Routes
 * @fileoverview 404 handler
 */

import { IExpressRoute, ROUTE_MODE } from '../builder/interface';

export default class RouteAllFourOFour implements IExpressRoute {
    public readonly path: string = '*';
    public readonly mode: null;

    public readonly before: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: any[] = [];
    public readonly after: boolean = true;

    public available(route: ROUTE_MODE) {
        return true;
    }
}
