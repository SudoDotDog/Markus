/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Compress By Tag handler
 */

import { Request, RequestHandler, Response } from "express";
import * as Direct from "../../../direct/import";
import { MODE } from "../../../interface";
import { ICompressZipResult } from "../../../util/execute/compress/compress";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export default class RouteCompressByTag extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Compress-By-Tag';
    public readonly path: string = '/tag/:tagId/compress';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Get compressed images',
        },
        description: {
            EN: 'Get compressed images',
        },
    };
    public readonly assertQuery: IExpressAssertionJSONType = {
        tagId: { type: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID },
    };

    public constructor() {
        super();
        this.handler = this.handler.bind(this);

        this.stack = [this.handler];
    }

    public available() {
        if (global.Markus.Config.mode === MODE.FILE_SYSTEM) {
            return true;
        }
        return false;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const tag: string = req.params.tagId;
            const callback: ICompressZipResult = await Direct.Backup.compressImagesByTag(tag, this._log);
            res.agent.addFile(callback.path);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
