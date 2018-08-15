/**
 * @author WMXPY
 * @fileoverview Avatar Handler
 */

import { Request, Response } from "express";
import { IAvatarCallback } from '../../database/interface/avatar';
import { IFileModel } from "../../database/model/file";
import * as Direct from '../../direct/import';
import { Icon } from "../../icon/icon";
import { fileBuilder } from "../../util/data/path";
import { error, ERROR_CODE, handlerError } from "../../util/error/error";
import { createTempFile } from "../../util/image";
import { RESPONSE } from "../../util/interface";
import { IFileManager } from "../../util/manager/file/import";

export const avatarGetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avatar: string = req.params.avatar;
        const text: string | undefined = req.query.text;
        const callback: IFileModel | null = await Direct.Avatar.rummageFileByAvatar(avatar);
        if (callback) {
            const filepath: string = fileBuilder(callback.folder, callback.filename);
            res.status(200).sendFile(filepath);
        } else {
            let tempFilePath: string;
            if (text) {
                tempFilePath = createTempFile(Icon(avatar, text), 'svg');
            } else {
                tempFilePath = createTempFile(Icon(avatar), 'svg');
            }
            res.status(200).sendFile(tempFilePath);
        }
    } catch (err) {
        console.log(err);
        handlerError(res, err);
    }
    return;
};

export const avatarBufferHandler = async (req: Request, res: Response): Promise<void> => {
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

        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: {
                avatar: callback.avatar,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const avatarBase64Handler = async (req: Request, res: Response): Promise<void> => {
    try {
        const avatar: string = req.body.avatar;
        const manager: IFileManager = req.manager;

        if (!req.valid) {
            manager.release();
            throw error(ERROR_CODE.PERMISSION_VALID_FAILED);
        }

        const base64Image: string = req.body.image;
        const mime: string = manager.mime();
        const hash: string = await manager.hash();
        const originalName: string = req.body.original || 'N/A';

        const callback: IAvatarCallback = await Direct.Avatar.createOrUpdateAvatar({
            avatar,
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
                avatar: callback.avatar,
            },
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

