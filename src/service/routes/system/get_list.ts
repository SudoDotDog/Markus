/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get List
 */

import { Request, RequestHandler, Response } from "express";
import * as Controller from "../../../database/controller/import";
import { IImageListResponse } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { error, ERROR_CODE } from "../../../util/error/error";
import UniqueArray from "../../../util/struct/uniqueArray";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteRiskyGetList implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Risky_Get_List';
    public readonly path: string = '/list';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;

    public available() {
        if (global.MarkusConfig.isDebug) {
            return true;
        }
        return false;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            if (global.MarkusConfig.isDebug) {
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
