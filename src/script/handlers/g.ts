/**
 * @author WMXPY
 * @fileoverview G Handler
 */

import { Request, Response } from "express";
import { error, ERROR_CODE } from "../../util/error";
import { RESPONSE } from '../../util/interface';

export const fourOFourHandler = (req: Request, res: Response): void => {
    res.status(404).send({
        status: RESPONSE.FAILED,
        action: [],
        error: error(ERROR_CODE.FOUR_O_FOUR_NOT_FOUND),
    });
};
