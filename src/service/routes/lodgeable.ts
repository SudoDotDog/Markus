/**
 * @author WMXPY
 * @description Route Log
 * @fileoverview Log class
 */

import { RequestHandler } from "express";
import Log from "../../plugin/log/log";
// tslint:disable-next-line
import { ExpressAssertionType, EXPRESS_SPECIAL_MARK, IExpressAssertionJSONType, IExpressResourcePath, IExpressRoute, ROUTE_MODE } from "../interface";

export default abstract class LodgeableExpressRoute implements IExpressRoute {
    public abstract readonly name: string;
    public abstract readonly path: string;
    public abstract readonly mode: ROUTE_MODE;
    public abstract readonly prepare: boolean;
    public abstract readonly authorization: boolean;
    public abstract readonly stack: RequestHandler[];
    public abstract readonly after: boolean;

    public readonly assertBody?: IExpressAssertionJSONType;
    public readonly assertParam?: IExpressAssertionJSONType;
    public readonly assertQuery?: IExpressAssertionJSONType;
    public readonly assertResponse?: IExpressAssertionJSONType;

    public ignoreInDoc: boolean = false;
    public resource: IExpressResourcePath = {};
    public specialMark: EXPRESS_SPECIAL_MARK[] = [];
    public testDrive: boolean = false;

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

    protected info(str: string) {
        if (this._log) {
            this._log.info(str);
        }
    }

    protected verifyBody(content: {
        [key: string]: any;
    }): boolean {
        if (!this.assertBody) {
            return true;
        }

        for (let key of Object.keys(this.assertBody)) {
            const expect: ExpressAssertionType = this.assertBody[key];

            if (
                !Object.keys(content).includes(key) &&
                !expect.optional
            ) {
                return false;
            }
        }

        return true;
    }

    protected verifyQuery(content: {
        [key: string]: any;
    }): boolean {
        if (!this.assertQuery) {
            return true;
        }

        for (let key of Object.keys(this.assertQuery)) {
            const expect: ExpressAssertionType = this.assertQuery[key];

            if (
                !Object.keys(content).includes(key) &&
                !expect.optional
            ) {
                return false;
            }
        }

        return true;
    }

    protected verifyParams(content: {
        [key: string]: any;
    }): boolean {
        if (!this.assertParam) {
            return true;
        }

        for (let key of Object.keys(this.assertParam)) {
            const expect: ExpressAssertionType = this.assertParam[key];

            if (
                !Object.keys(content).includes(key) &&
                !expect.optional
            ) {
                return false;
            }
        }

        return true;
    }
}
