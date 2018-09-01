/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Image handler
 */

import { ObjectID, ObjectId } from "bson";
import { Request, RequestHandler, Response } from "express";
import { IImageCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { concatSuffix } from "../../../util/data/path";
// tslint:disable-next-line
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE, IDocInformation, IExpressAssertionJSONType, EXPRESS_ASSERTION_TYPES_END } from '../../interface';

export default class RouteGetImageByPath implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Get-Image-By-Path';
    public readonly path: string;
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation;
    public readonly assertQuery: IExpressAssertionJSONType = {
        id: EXPRESS_ASSERTION_TYPES_END.OBJECT_ID,
    };

    private _emptyPath: string;

    public constructor(route: string, emptyPicturePath: string, suffix: string) {
        this._emptyPath = emptyPicturePath;
        this.path = route;
        this.name = concatSuffix(this.name, suffix);

        this.doc = {
            name: {
                EN: 'Get image - ' + suffix.toLowerCase(),
            },
            description: {
                EN: 'Get image from id, return ' + suffix.toLowerCase() + ' empty image if wanted image is not available',
            },
        };
    }

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const id: ObjectID = new ObjectId(req.params.id);
            const callback: IImageCallback = await Direct.Image.getImageCallbackById(id);
            res.agent.smartFileSend(callback.path);
        } catch (err) {
            res.agent.smartFileSend(this._emptyPath);
        } finally {
            next();
        }
        return;
    }
}
