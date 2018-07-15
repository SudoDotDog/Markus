/**
 * @author WMXPY
 * @fileoverview M Handler
 */

import { Request, Response } from "express";
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

export const UploadBufferHandler = (req: Request, res: Response): void => {
    console.log(req.body);
    res.status(200).send({
        status: RESPONSE.FAILED,
        action: [],
        error: error(ERROR_CODE.FOUR_O_FOUR_NOT_FOUND),
    });
};
