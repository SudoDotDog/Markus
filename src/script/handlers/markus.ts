/**
 * @author WMXPY
 * @fileoverview M Handler
 */

// tslint:disable-next-line
/// <reference path="../../declare/global.ts" />

import { NextFunction, Request, Response } from "express";
import { IImageCallback } from "../../database/interface/image";
import { IImageModel } from "../../database/model/image";
import * as Direct from '../../direct/import';
import { assert } from "../../util/error/assert";
import { error, ERROR_CODE, handlerError } from "../../util/error/error";
import { RESPONSE } from '../../util/interface';
import { IFileManager } from "../../util/manager/file/import";
import { markusVersion } from '../../util/struct/agent';

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
            tags = preTags.split(';');
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

export const DeactivateTagHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
        const tag: string = req.body.tag;
        const images: IImageModel[] = await Direct.Image.deactivateImageByTagString(tag);
        res.agent.add('deactivated', images.length);
        next();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const MarkusHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const version: string = await markusVersion();
        res.agent.add('agent', 'Markus');
        res.agent.add('version', version);
        next();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const FlushHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        if (res.agent) {
            res.agent.send();
        } else {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
