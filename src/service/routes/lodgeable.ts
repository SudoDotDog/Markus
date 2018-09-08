/**
 * @author WMXPY
 * @description Route Log
 * @fileoverview Log class
 */

import { RequestHandler } from "express";
import Log from "../../log/log";
import { IExpressRoute, ROUTE_MODE } from "../interface";

export default abstract class LodgeableExpressRoute implements IExpressRoute {
    public abstract readonly name: string;
    public abstract readonly path: string;
    public abstract readonly mode: ROUTE_MODE;
    public abstract readonly prepare: boolean;
    public abstract readonly authorization: boolean;
    public abstract readonly stack: RequestHandler[];
    public abstract readonly after: boolean;

    protected _log: Log | undefined;
    public constructor() {
        this._log = undefined;
    }

    public available(): boolean {
        return true;
    }

    public setLog(log: Log): IExpressRoute {
        this._log = log;
        return this;
    }

    protected verbose(str: string) {
        if (this._log) {
            this._log.verbose(str);
        }
    }
}
