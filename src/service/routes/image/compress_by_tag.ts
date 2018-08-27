/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Compress By Tag handler
 */

import { Request, RequestHandler, Response } from "express";
import * as Direct from "../../../direct/import";
import { IConfig, MODE } from '../../../markus';
import { handlerError } from "../../../util/error/error";
import { ICompressZipResult } from "../../../util/execute/compress/compress";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteCompressByTag implements IExpressRoute {
    public readonly path: string = '/tag/:tagId/compress';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public available(config: IConfig) {
        if (config.mode === MODE.FILE_SYSTEM) {
            return true;
        }
        return false;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const tag: string = req.params.tagId;
            const callback: ICompressZipResult = await Direct.Backup.compressImagesByTag(tag);
            res.agent.addFile(callback.path);
            next();
        } catch (err) {
            handlerError(res, err);
        }
        return;
    }
}
