/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool
 */

import { Request, Response } from "express";
import { MarkusExtensionConfig } from "../../../markus";
import { IMarkusTool, IMarkusToolboxInfo, IMarkusToolEstimate, IMarkusToolResult } from "../../../toolbox/toolbox";
import { getInformationByIMarkusTools } from "../../../toolbox/util/parse";
import { error, ERROR_CODE, handlerError } from "../../../util/error/error";
import { ResponseAgent } from '../util/agent';
import { installToolbox } from "./install";
import { findToolAndMatchFromToolbox } from "./util";

let Tools: IMarkusTool[] = [];

export const rebuildTools = () => {
    Tools = installToolbox(MarkusExtensionConfig);
};

setImmediate(rebuildTools);

export const markusToolboxEstimateHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: ResponseAgent = new ResponseAgent(res);
        const name: string | undefined = req.body.name;
        const args: any[] = req.body.args;
        if (!name || !args) {
            throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
        }

        const tool: IMarkusTool = findToolAndMatchFromToolbox(Tools, name);
        const result: IMarkusToolEstimate = await tool.estimate(...args);
        response.add('type', result.type);
        response.add('time', result.time);
        response.add('teapots', tool.teapots);
        response.send();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const markusToolboxExecuteHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: ResponseAgent = new ResponseAgent(res);
        const name: string | undefined = req.body.name;
        const args: any[] = req.body.args;
        if (!name || !args) {
            throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
        }

        const tool: IMarkusTool = findToolAndMatchFromToolbox(Tools, name);
        const result: IMarkusToolResult[] = await tool.execute(...args);
        response.add('result', result);
        response.add('teapots', tool.teapots);
        response.send();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};

export const markusToolboxListHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const response: ResponseAgent = new ResponseAgent(res);
        const info: IMarkusToolboxInfo[] = getInformationByIMarkusTools(Tools);
        response.add('tools', info);
        response.send();
    } catch (err) {
        handlerError(res, err);
    }
    return;
};
