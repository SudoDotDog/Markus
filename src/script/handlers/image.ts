/**
 * @author WMXPY
 * @fileoverview G Handler
 */

import { ObjectId, ObjectID } from "bson";
import { Request, Response, NextFunction } from "express";
import { IImageCallback, IImageUserFriendlyCallback } from "../../database/interface/image";
import * as Direct from '../../direct/import';
import Config from "../../markus";
import { error, ERROR_CODE, handlerError } from "../../util/error/error";
import { ICompressZipResult } from "../../util/execute/compress/compress";
import { RESPONSE } from '../../util/interface';

/**
 * GET
 * get image by id
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const image: IImageCallback = await Direct.Image.getImageCallbackById(id);
        res.status(200).sendFile(image.path);
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

/**
 * POST
 * get list by tag
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetListByTagHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag: string = req.body.tag;
        const callbacks: IImageUserFriendlyCallback[] = await Direct.Image.getImageUserFriendlyCallbackByTag(tag);
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: callbacks,
        });
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

/**
 * Get
 * get image by id, if none, return black null pic
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetBlankWhiteHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const callback: IImageCallback = await Direct.Image.getImageCallbackById(id);
        res.agent.addFile(callback.path);
    } catch (err) {
        res.agent.addFile(Config.white404ImagePath);
    } finally {
        next();
    }
    return;
};

/**
 * GET
 * get image by id, if none, return white null pic
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetBlankBlackHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const callback: IImageCallback = await Direct.Image.getImageCallbackById(id);
        res.status(200).sendFile(callback.path);
    } catch (err) {
        res.status(200).sendFile(Config.black404ImagePath);
    }
    return;
};

/* istanbul ignore next */
/**
 * GET
 * get image zip file by tag
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageCompressByTagHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag: string = req.params.tag;
        const callback: ICompressZipResult = await Direct.Backup.compressImagesByTag(tag);
        res.status(200).sendFile(callback.path);
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

/**
 * ALL
 * if 404, return 404 :D
 *
 * @param {Request} req
 * @param {Response} res
 */
export const UnAgent_FourOFourHandler = (req: Request, res: Response): void => {
    res.status(404).send({
        status: RESPONSE.FAILED,
        error: error(ERROR_CODE.FOUR_O_FOUR_NOT_FOUND),
    });
};
