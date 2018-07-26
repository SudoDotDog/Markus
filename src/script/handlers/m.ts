/**
 * @author WMXPY
 * @fileoverview M Handler
 */

// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import { Request, Response } from "express";
import * as Controller from '../../database/controller/import';
import { IImageCallback } from "../../database/interface/image";
import { IImageModel } from "../../database/model/image";
import { error, ERROR_CODE, handlerError } from "../../util/error";
import { RESPONSE } from '../../util/interface';
import { IFileManager } from "../../util/manager/file/import";

/**
 * POST
 * upload picture by buffer
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const UploadBufferHandler = async (req: Request, res: Response): Promise<void> => {
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

        const image: IImageCallback = await Controller.ImageMix.createDuplicateImage({
            encoding: file.encoding,
            mime: file.mimetype,
            hash,
            original: file.originalname,
            manager,
            size: file.size,
            tags,
        });
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                original: image.original,
                id: image.id,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

/**
 * POST
 * upload image by base64 string
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const UploadBase64Handler = async (req: Request, res: Response): Promise<void> => {
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

        const image: IImageCallback = await Controller.ImageMix.createDuplicateImage({
            encoding: 'base64',
            mime,
            original: originalName,
            hash,
            manager,
            size: base64Image.length,
            tags,
        });
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                original: image.original,
                id: image.id,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const DeactivateImageHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.valid) {
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }
        const imageId: string = req.body.id;
        const image: IImageModel = await Controller.Image.deactivateImageById(imageId);

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                id: image.id,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const DeactivateTagHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.valid) {
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }

        const tag: string = req.body.tag;
        const images: IImageModel[] = await Controller.Image.deactivateImageByTag(tag);

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                deactivated: images.length,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
