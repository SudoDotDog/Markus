/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Search Tag
 */

import { Request, RequestHandler, Response } from "express";
import * as Direct from "../../../direct/import";
import { assert } from '../../../util/error/assert';
import { ERROR_CODE } from "../../../util/error/error";
import { testDrive } from "../../decorator";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_POST_SUBMIT_FORMAT, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ISearchResult, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

@testDrive()
export default class RouteSearchGlobal extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Search-Global';
    public readonly path: string = '/search';
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
            EN: 'Global Search',
        },
        description: {
            EN: 'Globally search everything by string piece, return all: tag, image which match the cut',
        },
    };

    public async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const cut: string = req.body.cut;
            assert(cut).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            const tags: ISearchResult[] = await Direct.Tag.tagSearch(cut);
            res.agent.add('results', tags);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
