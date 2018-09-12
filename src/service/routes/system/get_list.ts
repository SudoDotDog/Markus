/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get List
 */

import { Request, RequestHandler, Response } from "express";
import * as Controller from "../../../database/controller/import";
import { IImageListResponse } from "../../../database/interface/image";
import { MARKUS_AUTHORIZATION_ROLE } from "../../../declare/interface";
import * as Direct from "../../../direct/import";
import { error, ERROR_CODE } from "../../../util/error/error";
import UniqueArray from "../../../util/struct/uniqueArray";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_SPECIAL_MARK, IDocInformation, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export default class RouteRiskyGetList extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Risky_Get_List';
    public readonly path: string = '/list';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Get all image',
        },
        description: {
            EN: 'Fetch all image from database',
        },
    };
    public readonly specialMark: EXPRESS_SPECIAL_MARK[] = [EXPRESS_SPECIAL_MARK.DEBUG, EXPRESS_SPECIAL_MARK.RISKY];
    public readonly authRole: MARKUS_AUTHORIZATION_ROLE[] = [MARKUS_AUTHORIZATION_ROLE.MANAGE];

    public available() {
        if (global.Markus.Config.isDebug) {
            return true;
        }
        return false;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            if (global.Markus.Config.isDebug) {
                const images: IImageListResponse[] = await Controller.Image.getImageList();
                const tagIds: UniqueArray<string> = new UniqueArray<string>();

                for (let image of images) {
                    tagIds.push(...image.tags);
                }

                const tagMap: Map<string, string> = await Direct.Tag.getTagStringsNamesMapByTagIdStrings(tagIds.list);

                for (let image of images) {
                    for (let i: number = 0; i < image.tags.length; i++) {
                        const name: string | undefined = tagMap.get(image.tags[i]);
                        if (name) {
                            image.tags[i] = name;
                        } else {
                            throw error(ERROR_CODE.INTERNAL_ERROR);
                        }
                    }
                }
                res.agent.add('data', images);
            } else {
                throw error(ERROR_CODE.DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION);
            }
        } catch (err) {
            res.agent.failed(500, err);
        } finally {
            next();
        }
        return;
    }
}
