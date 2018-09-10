/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Search Tag
 */

import { Request, RequestHandler, Response } from "express";
import * as Direct from "../../../direct/import";
import { assert } from '../../../util/error/assert';
import { ERROR_CODE } from "../../../util/error/error";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_POST_SUBMIT_FORMAT, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export default class RouteSearchTag extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Search-Tag';
    public readonly path: string = '/tag/search';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public readonly postType: EXPRESS_POST_SUBMIT_FORMAT = EXPRESS_POST_SUBMIT_FORMAT.X_WWW_FORM_URLENCODED;
    public readonly assertBody: IExpressAssertionJSONType = {
        cut: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
    };
    public readonly doc: IDocInformation = {
        name: {
            EN: 'Search Tag',
        },
        description: {
            EN: 'Globally search tag by string piece, return array of tag name',
        },
    };

    public async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const cut: string = req.body.cut;
            assert(cut).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            const tags: string[] = await Direct.Tag.tagSearch(cut);
            res.agent.add('tags', tags);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
