/**
 * @author WMXPY
 * @fileoverview Debug Handler
 */

import { Request, Response } from "express";
import Config from "../../config/config";
import * as Controller from '../../db/controller/import';
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

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
