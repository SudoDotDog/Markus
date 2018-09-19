/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Tag List
 */

import { Request, RequestHandler, Response } from "express";
import { ITagUserFriendly } from "../../../database/interface/tag";
import { MARKUS_AUTHORIZATION_ROLE } from "../../../declare/interface";
import * as Direct from "../../../direct/import";
import { assert } from "../../../util/error/assert";
import { ERROR_CODE } from "../../../util/error/error";
import { infoLog } from "../../decorator";
// tslint:disable-next-line
import { ExpressNextFunction, IDocInformation, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

@infoLog()
export default class RouteGetTagList extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Get-Tag-List';
    public readonly path: string = '/tag/list';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;
    public readonly authRole: MARKUS_AUTHORIZATION_ROLE[] = [MARKUS_AUTHORIZATION_ROLE.MANAGE];

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Get all tags',
        },
        description: {
            EN: 'Get all tags that active in the database',
        },
    };

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
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
