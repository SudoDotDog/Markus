/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Upload Thing by Base64
 */

import { Request, RequestHandler, Response } from "express";
import { IAvatarCallback } from "../../../database/interface/avatar";
import { IImageCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { availableAnythingToDate } from "../../../util/data/date";
import { concatSuffix } from "../../../util/data/path";
import { assert } from "../../../util/error/assert";
import { error, ERROR_CODE } from "../../../util/error/error";
import { IFileManager } from "../../../util/manager/file/import";
import { marks } from "../../decorator";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_POST_SUBMIT_FORMAT, EXPRESS_SPECIAL_MARK, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export enum SERVICE_ROUTE_UPLOAD_BASE64_MODE {
    AVATAR = 'AVATAR',
    IMAGE = 'IMAGE',
    AVATAR_DOC = 'AVATAR_DOC',
    IMAGE_DOC = 'IMAGE_DOC',
}

@marks(EXPRESS_SPECIAL_MARK.DEPRECATED)
export default class RouteUploadAvatarByBase64 extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Upload-By-Base64';
    public readonly path: string;
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly postType: EXPRESS_POST_SUBMIT_FORMAT[] = [
        EXPRESS_POST_SUBMIT_FORMAT.X_WWW_FORM_URLENCODED
    ];
    public readonly assertBody: IExpressAssertionJSONType;
    public readonly doc: IDocInformation | null;

    public constructor(docMode: SERVICE_ROUTE_UPLOAD_BASE64_MODE, route: string, suffix: string, uploadEngine?: RequestHandler) {
        super();
        this.path = route;
        this.name = concatSuffix(this.name, suffix);
        this.assertBody = {};
        this.doc = null;
        if (docMode === SERVICE_ROUTE_UPLOAD_BASE64_MODE.AVATAR_DOC) {
            // Documents
            this.doc = {
                name: {
                    EN: 'Upload avatar by base64',
                },
                description: {
                    EN: 'Replace target avatar by uploaded image',
                },
            };
            this.assertBody = {
                avatar: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                image: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                original: {
                    type: EXPRESS_ASSERTION_TYPES_END.STRING,
                    optional: true,
                },
                ctime: {
                    type: EXPRESS_ASSERTION_TYPES_END.NUMBER,
                    optional: true,
                },
            };
        }

        if (docMode === SERVICE_ROUTE_UPLOAD_BASE64_MODE.IMAGE_DOC) {
            // Documents
            this.doc = {
                name: {
                    EN: 'Upload image by base64',
                },
                description: {
                    EN: 'Add image to server, return id of uploaded image',
                },
            };
            this.assertBody = {
                tags: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                image: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                original: {
                    type: EXPRESS_ASSERTION_TYPES_END.STRING,
                    optional: true,
                },
                ctime: {
                    type: EXPRESS_ASSERTION_TYPES_END.NUMBER,
                    optional: true,
                },
            };
        }

        if (docMode !== SERVICE_ROUTE_UPLOAD_BASE64_MODE.AVATAR_DOC && docMode !== SERVICE_ROUTE_UPLOAD_BASE64_MODE.IMAGE_DOC) {
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

    protected async avatarHandler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const avatar: string = req.body.avatar;
            const manager: IFileManager = req.manager;
            const ctime: Date | undefined = availableAnythingToDate(req.body.ctime);

            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const base64Image: string = req.body.image;
            const mime: string = manager.mime();
            const hash: string = await manager.hash();
            const originalName: string = req.body.original || 'Not-Provided';

            const callback: IAvatarCallback = await Direct.Avatar.createOrUpdateAvatar({
                ctime,
                avatar,
                encoding: 'base64',
                mime,
                original: originalName,
                hash,
                manager,
                size: base64Image.length,
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
            const ctime: Date | undefined = availableAnythingToDate(req.body.ctime);

            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const base64Image: string = req.body.image;
            const preTags: string[] | string = req.body.tags;
            assert(base64Image).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            const originalName: string = req.body.original || 'Not-Provided';
            let tags: string[] = [];
            if (typeof preTags === 'string') {
                tags = preTags.split(';');
            } else {
                tags = preTags;
            }

            if (!base64Image) {
                throw error(ERROR_CODE.IMAGE_SAVE_FAILED);
            }

            const mime: string = manager.mime();
            const hash: string = await manager.hash();

            const image: IImageCallback = await Direct.Image.createImageByIImageCreationConfigWithTagCacheManager({
                ctime,
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
