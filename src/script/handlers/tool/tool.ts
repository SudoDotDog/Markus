/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool
 */

import { Request, Response } from "express";
import { handlerError } from "../../../util/error";
import { installToolbox } from "./install";

export const markusToolboxHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const tools = installToolbox();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
