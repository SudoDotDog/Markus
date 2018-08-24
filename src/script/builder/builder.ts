/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Class
 */

import { IExpressBuilder, IExpressRoute } from "./interface";

export default class ExpressBuilder implements IExpressBuilder {
    private _routes: IExpressRoute[];

    public constructor() {
        this._routes = [];
    }

    public route(route: IExpressRoute): IExpressBuilder {
        return this;
    }
}
