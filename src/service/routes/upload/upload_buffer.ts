/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Upload Avatar by Buffer
 */

import { Request, RequestHandler, Response } from "express";
import { IAvatarCallback } from "../../../database/interface/avatar";
import { IImageCallback } from "../../../database/interface/image";
import * as Direct from "../../../direct/import";
import { availableAnythingToDate } from "../../../util/data/date";
import { concatSuffix } from "../../../util/data/path";
import { error, ERROR_CODE } from "../../../util/error/error";
import { IFileManager } from "../../../util/manager/file/import";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_POST_SUBMIT_FORMAT, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE, EXPRESS_EXAMPLE_CODE, EXPRESS_ASSERTION_TYPES_UNION } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

export enum SERVICE_ROUTE_UPLOAD_BUFFER_MODE {
    AVATAR = 'AVATAR',
    IMAGE = 'IMAGE',
    AVATAR_DOC = 'AVATAR_DOC',
    IMAGE_DOC = 'IMAGE_DOC',
}

export default class RouteUploadAvatarByBuffer extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Upload-By-Buffer';
    public readonly path: string;
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly veryBefore: RequestHandler[];

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly postType: EXPRESS_POST_SUBMIT_FORMAT = EXPRESS_POST_SUBMIT_FORMAT.FORM_DATA;
    public readonly assertBody: IExpressAssertionJSONType;
    public readonly exampleCode: EXPRESS_EXAMPLE_CODE[] = [
        EXPRESS_EXAMPLE_CODE.NODEJS_FORM_DATA,
        EXPRESS_EXAMPLE_CODE.FETCH_FORM_DATA,
    ];

    public readonly doc: IDocInformation | null;

    public constructor(docMode: SERVICE_ROUTE_UPLOAD_BUFFER_MODE, route: string, suffix: string, multerEngine?: RequestHandler, uploadEngine?: RequestHandler) {
        super();
        this.path = route;
        this.name = concatSuffix(this.name, suffix);
        this.assertBody = {};
        this.doc = null;
        if (docMode === SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR_DOC) {
            // Documents
            this.doc = {
                name: {
                    EN: 'Upload avatar by buffer',
                },
                description: {
                    EN: 'Replace target avatar by uploaded image',
                },
            };
            this.assertBody = {
                avatar: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                image: { type: EXPRESS_ASSERTION_TYPES_END.FILE },
                ctime: {
                    type: EXPRESS_ASSERTION_TYPES_END.NUMBER,
                    optional: true,
                },
            };
        }

        if (docMode === SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE_DOC) {
            // Documents
            this.doc = {
                name: {
                    EN: 'Upload image by buffer',
                },
                description: {
                    EN: 'Add image to server, return id of uploaded image',
                },
            };
            this.assertBody = {
                image: { type: EXPRESS_ASSERTION_TYPES_END.FILE },
                tags: {
                    type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
                    child: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                    split: ';',
                },
                ctime: {
                    type: EXPRESS_ASSERTION_TYPES_END.NUMBER,
                    optional: true,
                },
            };
        }

        if (docMode !== SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE_DOC && docMode !== SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR_DOC) {
            if (!multerEngine || !uploadEngine || !suffix) {
                throw error(ERROR_CODE.INTERNAL_DOC_CONSTRUCTOR_NOT_FULFILLED);
            }
            let handler: RequestHandler;
            switch (docMode) {
                case SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR:
                    handler = this.avatarHandler;
                    break;
                case SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE:
                    handler = this.imageHandler;
                    break;
                default:
                    throw error(ERROR_CODE.INTERNAL_DOC_CONSTRUCTOR_NOT_FULFILLED);
            }
            this.veryBefore = [
                multerEngine,
            ];
            this.stack = [

                uploadEngine,
                handler,
            ];
        } else {
            this.veryBefore = [];
            this.stack = [];
        }
    }

    public async avatarHandler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const avatar: string = req.body.avatar;
            const file: Express.Multer.File = req.file;
            const manager: IFileManager = req.manager;
            const ctime: Date | undefined = availableAnythingToDate(req.body.ctime);

            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const hash: string = await manager.hash();
            const callback: IAvatarCallback = await Direct.Avatar.createOrUpdateAvatar({
                ctime,
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

    public async imageHandler(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const file: Express.Multer.File = req.file;
            const manager: IFileManager = req.manager;
            const ctime: Date | undefined = availableAnythingToDate(req.body.ctime);

            if (!req.valid) {
                manager.release();
                throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
            }

            const preTags: string[] | string = req.body.tags;
            let tags: string[] = [];
            if (typeof preTags === 'string') {
                tags = preTags.split(';');
            } else {
                tags = preTags;
            }

            const hash: string = await manager.hash();

            const image: IImageCallback = await Direct.Image.createImageByIImageCreationConfigWithTagCacheManager({
                ctime,
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
        } finally {
            next();
        }
        return;
    }
}
