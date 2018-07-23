/**
 * @author WMXPY
 * @fileoverview Avator Handler
 */

import { Request, Response } from "express";
import * as Controller from '../../database/controller/import';
import { IAvatorCallback } from '../../database/interface/avator';
import { IFileModel } from "../../database/model/file";
import { Icon } from "../../icon/icon";
import { error, ERROR_CODE, handlerError } from "../../util/error";
import { createTempFile, hashImage, releaseStorage } from "../../util/image";
import { RESPONSE } from "../../util/interface";

export const avatorGetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avator = req.params.avator;
        const callback: IFileModel | null = await Controller.AvatorMix.getFileByAvator(avator);
        if (callback) {
            res.status(200).sendFile(callback.path);
        } else {
            const tempFilePath: string = createTempFile(Icon(avator), 'svg');
            res.status(200).sendFile(tempFilePath);
        }
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const avatorSetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avator = req.query.avator;
        const file: Express.Multer.File = req.file;
        if (!(req as any).valid) {
            await releaseStorage(file.path);
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }
        const hash: string = await hashImage(file.path);
        const callback: IAvatorCallback = await Controller.AvatorMix.createOrUpdateAvator({
            avator,
            encoding: file.encoding,
            mime: file.mimetype,
            original: file.originalname,
            hash,
            path: file.path,
            size: file.size,
        });

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                id: callback.id,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

