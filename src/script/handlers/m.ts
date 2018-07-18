/**
 * @author WMXPY
 * @fileoverview M Handler
 */

import { Request, Response } from "express";
import * as Path from 'path';
import * as Controller from '../../db/controller/import';
import { IImageModel } from "../../db/model/image";
import { error, ERROR_CODE } from "../../util/error";
import { hashImage, UploadWithBase64 } from "../../util/image";
import { RESPONSE } from '../../util/interface';

const saveBase64ToFile: (base64: string) => Promise<string> = UploadWithBase64();

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
        if (!(req as any).valid) {
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }

        const preTags: string[] | string = req.body.tags;
        let tags: string[] = [];
        if (typeof preTags === 'string') {
            tags = preTags.split(',');
        } else {
            tags = preTags;
        }
        const file: Express.Multer.File = req.file;
        const hash: string = await hashImage(file.path);

        const image: IImageModel = await Controller.Image.createDeduplicateImage({
            encoding: file.encoding,
            mime: file.mimetype,
            original: file.originalname,
            hash,
            path: file.path,
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
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
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
        if (!(req as any).valid) {
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
        const filepath: string = await saveBase64ToFile(base64Image);
        const ext: string = Path.extname(filepath);
        const hash: string = await hashImage(filepath);

        const image: IImageModel = await Controller.Image.createDeduplicateImage({
            encoding: 'base64',
            mime: ext.substring(1, ext.length),
            original: originalName,
            hash,
            path: filepath,
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
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
    }
    return;
};

export const DeactiveImageHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const imageId: string = req.body.id;
        const image: any = await Controller.Image.deactiveImageById(imageId);
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                result: image,
            },
        });
    } catch (err) {
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
    }
    return;
};
