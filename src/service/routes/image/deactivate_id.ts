/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Deactivate Id
 */

import { Request, RequestHandler, Response } from "express";
import { IImageModel } from "../../../database/model/image";
import * as Direct from "../../../direct/import";
import { assert } from "../../../util/error/assert";
import { ERROR_CODE } from "../../../util/error/error";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteDeactivateImageById implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Deactivate_Image_By_Id';
    public readonly path: string = '/deactivate/id';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Deactive image by id',
        },
        description: {
            EN: 'Deactive target image by id, if target image have no reference, release storage',
        },
    };
    public readonly assertBody: IExpressAssertionJSONType = {
        id: EXPRESS_ASSERTION_TYPES_END.OBJECTID,
    };

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const imageId: string = req.body.id;
            const image: IImageModel = await Direct.Image.deactivateImageById(imageId);
            res.agent.add('id', image._id.toString());
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
