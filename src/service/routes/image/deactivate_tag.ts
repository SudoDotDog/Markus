/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Deactivate Tag
 */

import { Request, RequestHandler, Response } from "express";
import { IImageModel } from "../../../database/model/image";
import * as Direct from "../../../direct/import";
import { assert } from "../../../util/error/assert";
import { ERROR_CODE } from "../../../util/error/error";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../../lodgeable";

export default class RouteDeactivateImagesByTag extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Deactivate_Images_By_Tag';
    public readonly path: string = '/deactivate/tag';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Deactivate image by tag',
        },
        description: {
            EN: 'Deactivate a set images that contain target tag, if any image of them have no reference, release storage',
        },
    };
    public readonly assertBody: IExpressAssertionJSONType = {
        tag: EXPRESS_ASSERTION_TYPES_END.STRING,
    };

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const tag: string = req.body.tag;
            const images: IImageModel[] = await Direct.Image.deactivateImageByTagString(tag);
            res.agent.add('deactivated', images.length);
            next();
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
