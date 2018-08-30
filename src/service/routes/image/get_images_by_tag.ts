/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Images By Tag
 */

import { Request, RequestHandler, Response } from "express";
import { IImageUserFriendlyCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteGetImagesByTag implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Get-Images-By-Tag';
    public readonly path: string = '/tag';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const tag: string = req.body.tag;
            const callbacks: IImageUserFriendlyCallback[] = await Direct.Image.getImageUserFriendlyCallbackByTag(tag);
            res.agent.add('images', callbacks);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
