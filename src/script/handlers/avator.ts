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
import { createTempFile } from "../../util/image";
import { RESPONSE } from "../../util/interface";
import { IFileManager } from "../../util/manager/file/import";

export const avatorGetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avator: string = req.params.avator;
        const text: string | undefined = req.query.text;
        const callback: IFileModel | null = await Controller.AvatorMix.getFileByAvator(avator);
        if (callback) {
            res.status(200).sendFile(callback.path);
        } else {
            let tempFilePath: string;
            if (text) {
                tempFilePath = createTempFile(Icon(avator, text), 'svg');
            } else {
                tempFilePath = createTempFile(Icon(avator), 'svg');
            }
            res.status(200).sendFile(tempFilePath);
        }
    } catch (err) {
        console.log(err);
        handlerError(res, err);
    }
    return;
};

export const avatorBufferHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avator: string = req.body.avator;
        const file: Express.Multer.File = req.file;
        const manager: IFileManager = req.manager;

        if (!req.valid) {
            manager.release();
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }

        const hash: string = await manager.hash();
        const callback: IAvatorCallback = await Controller.AvatorMix.createOrUpdateAvator({
            avator,
            encoding: file.encoding,
            mime: file.mimetype,
            original: file.originalname,
            hash,
            manager,
            size: file.size,
        });

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                avator: callback.avator,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const avatorBase64Handler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avator: string = req.body.avator;
        const manager: IFileManager = req.manager;

        if (!req.valid) {
            manager.release();
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }

        const base64Image: string = req.body.image;
        const mime: string = manager.mime();
        const hash: string = await manager.hash();
        const originalName: string = req.body.original || 'N/A';

        const callback: IAvatorCallback = await Controller.AvatorMix.createOrUpdateAvator({
            avator,
            encoding: 'base64',
            mime,
            original: originalName,
            hash,
            manager,
            size: base64Image.length,
        });

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                avator: callback.avator,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

