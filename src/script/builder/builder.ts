/**
 * @author WMXPY
 * @description Route Builder
 * @fileoverview Class
 */

import { Express } from "express";
import { IExpressBuilder, IExpressRoute } from "./interface";

export default class ExpressBuilder implements IExpressBuilder {
    private _routes: IExpressRoute[];
    private _app: Express;

    public constructor(app: Express) {
        this._routes = [];
        this._app = app;
    }

    public route(route: IExpressRoute): IExpressBuilder {
        this._routes.push(route);
        return this;
    }

    public routes(routes: IExpressRoute[]): IExpressBuilder {
        this._routes.push(...routes);
        return this;
    }

    public flush() {
        console.log(this._app);
    }
}
