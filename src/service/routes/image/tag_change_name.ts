/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Rename tag
 */

import { Request, RequestHandler, Response } from "express";
import * as Direct from "../../../direct/import";
import { assert } from '../../../util/error/assert';
import { ERROR_CODE } from "../../../util/error/error";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_POST_SUBMIT_FORMAT, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteRenameTag implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Rename-Tag';
    public readonly path: string = '/tag/rename';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handler,
    ];
    public readonly after: boolean = true;

    public readonly postType: EXPRESS_POST_SUBMIT_FORMAT = EXPRESS_POST_SUBMIT_FORMAT.X_WWW_FORM_URLENCODED;
    public readonly assertBody: IExpressAssertionJSONType = {
        tag: EXPRESS_ASSERTION_TYPES_END.STRING,
        name: EXPRESS_ASSERTION_TYPES_END.STRING,
    };
    public readonly doc: IDocInformation = {
        name: {
            EN: 'Rename Tag',
        },
        description: {
            EN: 'Rename target tag with a new name, <tag> for original tag name, <name> for new name',
        },
    };

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const tagName: string = req.body.tag;
            const newName: string = req.body.name;
            assert(tagName).and(newName).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            const newTag = await Direct.Tag.renameTagToNewNameByTagCurrentName(tagName, newName);
            res.agent.add('tag', newTag.name);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
