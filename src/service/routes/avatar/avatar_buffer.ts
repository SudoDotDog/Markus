/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Upload Avatar by Buffer
 */

import { Request, RequestHandler, Response } from "express";
import { IImageCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { error, ERROR_CODE } from "../../../util/error/error";
import { IFileManager } from "../../../util/manager/file/import";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteUploadAvatarByBuffer implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route-Upload-Avatar-By-Buffer';
    public readonly path: string = '/v/buffer';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public constructor(docMode: boolean, multerEngine?: RequestHandler, uploadEngine?: RequestHandler) {
        if (!docMode) {
            if (!multerEngine || !uploadEngine) {
                throw error(ERROR_CODE.INTERNAL_DOC_CONSTRUCTOR_NOT_FUFILLED);
            }
            this.stack = [
                multerEngine,
                uploadEngine,
                this.handler,
            ];
        } else {
            this.stack = [];
        }
    }

    public available() {
        return true;
    }

    protected async handler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const file: Express.Multer.File = req.file;
            const manager: IFileManager = req.manager;
            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const preTags: string[] | string = req.body.tags;
            let tags: string[] = [];
            if (typeof preTags === 'string') {
                tags = preTags.split(',');
            } else {
                tags = preTags;
            }

            const hash: string = await manager.hash();

            const image: IImageCallback = await Direct.Image.createImageByIImageCreationConfigWithTagCacheManager({
                encoding: file.encoding,
                mime: file.mimetype,
                hash,
                original: file.originalname,
                manager,
                size: file.size,
                tags,
            });
            res.agent.add('original', image.original)
                .add('id', image.id);
        } catch (err) {
            res.agent.failed(400, err);
        }
        return;
    }
}
