/**
 * @author WMXPY
 * @fileoverview G Handler
 */

import { ObjectId, ObjectID } from "bson";
import { NextFunction, Request, Response } from "express";
import * as Path from 'path';
import { IImageCallback, IImageUserFriendlyCallback } from "../../database/interface/image";
import { ITagUserFriendly } from "../../database/interface/tag";
import * as Direct from '../../direct/import';
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
        res.agent.smartFileSend(callback.path);
    } catch (err) {
        const absolutePath: string = Path.resolve(global.Markus.Config.white404ImagePath);
        res.agent.smartFileSend(absolutePath);
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
export const imageGetBlankBlackHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const callback: IImageCallback = await Direct.Image.getImageCallbackById(id);
        res.agent.smartFileSend(callback.path);
    } catch (err) {
        const absolutePath: string = Path.resolve(global.Markus.Config.black404ImagePath);
        res.agent.smartFileSend(absolutePath);
    } finally {
        next();
    }
    return;
};

/* istanbul ignore next */
/**
 * DEPRECATED, USE ROUTE VERSION INSTEAD
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
 * POST
 * Get tag list with user friendly format
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const allTagUserFriendlyListHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const tags: ITagUserFriendly[] = await Direct.Tag.getAllActiveTagUserFriendlyList();
        res.agent.add('list', tags);
        next();
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
