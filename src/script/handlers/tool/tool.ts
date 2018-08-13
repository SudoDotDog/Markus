/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool
 */

import { Request, Response } from "express";
import Config, { IConfig } from '../../../markus';
import { IMarkusResult, IMarkusTool, IMarkusToolboxInfo } from "../../../toolbox/toolbox";
import { getInformationByIMarkusTools } from "../../../toolbox/util/parse";
import { error, ERROR_CODE, handlerError } from "../../../util/error";
import { ResponseAgent } from '../util/agent';
import { installToolbox } from "./install";

let Tools: IMarkusTool[] = [];

export const rebuildTools = () => {
    Tools = installToolbox(Config);
};

setImmediate(rebuildTools);

export const markusToolboxExecuteHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = new ResponseAgent(res);
        const name: string | undefined = req.body.name;
        const args: any[] = req.body.args;
        if (!name || !args) {
            throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
        }

        let found: IMarkusTool | undefined;

        for (let tool of Tools) {
            if (tool.name === name) {
                found = tool;
                break;
            }
        }
        if (!found) {
            throw error(ERROR_CODE.TARGET_TOOL_NOT_FOUND);
        }

        const verify: boolean = found.verify(...args);
        if (!verify) {
            throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
        }

        const result: IMarkusResult[] = await found.execute(...args);
        response.add('result', result);
        response.send();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const markusToolboxListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = new ResponseAgent(res);
        const info: IMarkusToolboxInfo[] = getInformationByIMarkusTools(Tools);
        response.add('tools', info);
        response.send();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
