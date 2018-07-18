/**
 * @author WMXPY
 * @fileoverview M Handler
 */

import { Request, Response } from "express";
import * as Path from 'path';
import Config from "../../config/config";
import * as Controller from '../../db/controller/import';
import { IImageListResponse } from "../../db/interface/image";
import { IImageModel } from "../../db/model/image";
import { error, ERROR_CODE } from "../../util/error";
import { hashImage, UploadWithBase64 } from "../../util/image";
import { RESPONSE } from '../../util/interface';

const saveBase64ToFile: (base64: string) => Promise<string> = UploadWithBase64();

export const UploadBufferHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const file: Express.Multer.File = req.file;
        const hash: string = await hashImage(file.path);

        const image: IImageModel = await Controller.Image.createDeduplicateImage({
            encoding: file.encoding,
            mime: file.mimetype,
            original: file.originalname,
            path: file.path,
            size: file.size,
            hash,
        });
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
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

export const UploadBase64Handler = async (req: Request, res: Response): Promise<void> => {
    try {
        const base64Image: string = req.body.image;
        if (!base64Image) {
            throw error(ERROR_CODE.IMAGE_SAVE_FAILED);
        }
        const filepath: string = await saveBase64ToFile(base64Image);
        const ext: string = Path.extname(filepath);
        const hash: string = await hashImage(filepath);

        const image: IImageModel = await Controller.Image.createDeduplicateImage({
            encoding: 'base64',
            mime: ext.substring(1, ext.length),
            original: 'N/A',
            path: filepath,
            size: base64Image.length,
            hash,
        });
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
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

export const OutputImageIdList = async (req: Request, res: Response): Promise<void> => {
    try {
        if (Config.isDebug) {
            const images: IImageListResponse[] = await Controller.Image.getImageList();
            res.status(200).send({
                status: RESPONSE.SUCCEED,
                data: images,
            });
        } else {
            throw error(ERROR_CODE.DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION);
        }
    } catch (err) {
        res.status(400).send({
            status: RESPONSE.FAILED,
            error: err,
        });
    }
    return;
};
