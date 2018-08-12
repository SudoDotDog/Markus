/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool
 */

import { Request, Response } from "express";
import { IMarkusToolboxInfo } from "../../../toolbox/toolbox";
import { getInformationByIMarkusTools } from "../../../toolbox/util/parse";
import { handlerError } from "../../../util/error";
import { installToolbox } from "./install";

const Tools = installToolbox();

export const markusToolboxExecuteHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const tools = installToolbox();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const markusToolboxListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const info: IMarkusToolboxInfo[] = getInformationByIMarkusTools(Tools);
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
