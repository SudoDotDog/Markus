/**
 * @author WMXPY
 * @fileoverview Debug Handler
 */

import { Request, Response } from "express";
import Config from "../../config/config";
import * as Controller from '../../db/controller/import';
import { IImageListResponse } from "../../db/interface/image";
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

/**
 * POST
 * remove all data in db, only use in debug
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
export const emptyDatabaseHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        if (Config.isDebug) {
            await Controller.Image.emptyDatabase();
            res.status(200).send({
                status: RESPONSE.SUCCEED,
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


/**
 * POST
 * get all image list, only use in debug
 *
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<void>}
 */
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
