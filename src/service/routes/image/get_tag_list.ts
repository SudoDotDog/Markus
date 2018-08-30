/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Tag List
 */

import { Request, RequestHandler, Response } from "express";
import { ITagUserFriendly } from "../../../database/interface/tag";
import * as Direct from "../../../direct/import";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteGetTagList implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Get-Tag-List';
    public readonly path: string = '/tag/list';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const tags: ITagUserFriendly[] = await Direct.Tag.getAllActiveTagUserFriendlyList();
            res.agent.add('list', tags);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
