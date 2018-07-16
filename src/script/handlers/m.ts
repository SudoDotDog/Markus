/**
 * @author WMXPY
 * @fileoverview M Handler
 */

import { Request, Response } from "express";
import * as Controller from '../../db/controller/import';
import { IImageModel } from "../../db/model/image";
import { RESPONSE } from '../../util/interface';

export const UploadBufferHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const file: Express.Multer.File = req.file;
        const image: IImageModel = await Controller.Image.createImage({
            encoding: file.encoding,
            mime: file.mimetype,
            original: file.originalname,
            path: file.path,
            size: file.size,
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
