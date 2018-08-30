/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Root
 */

import { Request, RequestHandler, Response } from "express";
import { markusVersion } from "../../../util/struct/agent";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteRoot implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Root';
    public readonly path: string = '/';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;

    public available() {
        return true;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const version: string = await markusVersion();
            res.agent.add('agent', 'Markus');
            res.agent.add('version', version);
        } catch (err) {
            res.agent.failed(500, err);
        } finally {
            next();
        }
        return;
    }
}
