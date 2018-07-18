/**
 * @author WMXPY
 * @fileoverview G Handler
 */

import { ObjectId, ObjectID } from "bson";
import { Request, Response } from "express";
import Config from "../../config/config";
import * as Controller from '../../db/controller/import';
import { IImageCallback, IImageListResponse } from "../../db/interface/image";
import { error, ERROR_CODE } from "../../util/error";
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
        const image: IImageCallback = await Controller.Image.getImageById(id);
        res.status(200).sendFile(image.path);
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
 * get list by tag
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetListByTagHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const tag: string = req.body.tag;
        const images: IImageListResponse[] = await Controller.Image.getImagesByTag(tag);
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: images,
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
 * get list by original name
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetListByOriginalNameHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const originalName: string = req.body.original;
        const images: IImageListResponse[] = await Controller.Image.getImagesByOriginalName(originalName);
        res.status(200).send({
            status: RESPONSE.SUCCEED,
            data: images,
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
 * Get
 * get image by id, if none, return black null pic
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const imageGetBlankWhiteHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: ObjectID = new ObjectId(req.params.id);
        const image: IImageCallback = await Controller.Image.getImageById(id);
        res.status(200).sendFile(image.path);
    } catch (err) {
        res.status(200).sendFile(Config.white404ImagePath);
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
        const image: IImageCallback = await Controller.Image.getImageById(id);
        res.status(200).sendFile(image.path);
    } catch (err) {
        res.status(200).sendFile(Config.black404ImagePath);
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
export const fourOFourHandler = (req: Request, res: Response): void => {
    res.status(404).send({
        status: RESPONSE.FAILED,
        error: error(ERROR_CODE.FOUR_O_FOUR_NOT_FOUND),
    });
};
