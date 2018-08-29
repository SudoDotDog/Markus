/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Class
 */

import { IExpressRoute } from "../service/interface";
import { error, ERROR_CODE } from "../util/error/error";
import Fork from '../util/struct/fork';

export default class DocRouteBuilder {
    private _routes: Fork<IExpressRoute>;

    public constructor() {
        this._routes = new Fork<IExpressRoute>();
    }

    public get list(): IExpressRoute[] {
        return this._routes.list;
    }

    public route(route: IExpressRoute): DocRouteBuilder {
        const exist: boolean = this._routes.has((element: IExpressRoute) => {
            return (element.path === route.path)
                && (element.mode === route.mode);
        });
        if (exist) {
            throw error(ERROR_CODE.INTERNAL_DOC_BUILDER_ROUTE_CANT_BE_SAME);
        }

        this._routes.add(route);
        return this;
    }

    public routes(routes: IExpressRoute[]): DocRouteBuilder {
        for (let route of routes) {
            this.route(route);
        }
        return this;
    }
}
