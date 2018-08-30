/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Upload Thing by Base64
 */

import { Request, RequestHandler, Response } from "express";
import { IAvatarCallback } from "../../../database/interface/avatar";
import { IImageCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { concatSuffix } from "../../../util/data/path";
import { error, ERROR_CODE } from "../../../util/error/error";
import { IFileManager } from "../../../util/manager/file/import";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export enum SERVICE_ROUTE_UPLOAD_BASE64_MODE {
    AVATAR = 'AVATAR',
    IMAGE = 'IMAGE',
    DOC = 'DOC',
}

export default class RouteUploadAvatarByBase64 implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Upload-By-Base64';
    public readonly path: string;
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public constructor(docMode: SERVICE_ROUTE_UPLOAD_BASE64_MODE, route: string, suffix: string, uploadEngine?: RequestHandler) {
        this.path = route;
        this.name = concatSuffix(this.name, suffix);
        if (docMode !== SERVICE_ROUTE_UPLOAD_BASE64_MODE.DOC) {
            if (!uploadEngine || !suffix) {
                throw error(ERROR_CODE.INTERNAL_DOC_CONSTRUCTOR_NOT_FULFILLED);
            }
            let handler: RequestHandler;
            switch (docMode) {
                case SERVICE_ROUTE_UPLOAD_BASE64_MODE.AVATAR:
                    handler = this.avatarHandler;
                    break;
                case SERVICE_ROUTE_UPLOAD_BASE64_MODE.IMAGE:
                    handler = this.imageHandler;
                    break;
                default:
                    throw error(ERROR_CODE.INTERNAL_DOC_CONSTRUCTOR_NOT_FULFILLED);
            }
            this.stack = [
                uploadEngine,
                handler,
            ];
        } else {
            this.stack = [];
        }
    }

    public available() {
        return true;
    }

    protected async avatarHandler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const avatar: string = req.body.avatar;
            const file: Express.Multer.File = req.file;
            const manager: IFileManager = req.manager;
            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const hash: string = await manager.hash();
            const callback: IAvatarCallback = await Direct.Avatar.createOrUpdateAvatar({
                avatar,
                encoding: file.encoding,
                mime: file.mimetype,
                original: file.originalname,
                hash,
                manager,
                size: file.size,
            });
            res.agent.add('avatar', callback.avatar);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected async imageHandler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const manager: IFileManager = req.manager;

            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const base64Image: string = req.body.image;
            const preTags: string[] | string = req.body.tags;
            const originalName: string = req.body.original || 'N/A';
            let tags: string[] = [];
            if (typeof preTags === 'string') {
                tags = preTags.split(',');
            } else {
                tags = preTags;
            }

            if (!base64Image) {
                throw error(ERROR_CODE.IMAGE_SAVE_FAILED);
            }

            const mime: string = manager.mime();
            const hash: string = await manager.hash();

            const image: IImageCallback = await Direct.Image.createImageByIImageCreationConfigWithTagCacheManager({
                encoding: 'base64',
                mime,
                original: originalName,
                hash,
                manager,
                size: base64Image.length,
                tags,
            });
            res.agent.add('original', image.original)
                .add('id', image.id);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
