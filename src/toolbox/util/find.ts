/**
 * @author WMXPY
 * @description Tools Util
 * @fileoverview Find
 */

import { error, ERROR_CODE } from "../../util/error/error";
import { IMarkusTool, IMarkusToolArgs } from "../interface";

export const findToolFromToolbox = (tools: IMarkusTool[], name: string): IMarkusTool => {
    for (let tool of tools) {
        if (tool.name === name || tool.nickname === name) {
            if (tool.available()) {
                return tool;
            }
        }
    }
    throw error(ERROR_CODE.TARGET_TOOL_NOT_FOUND);
};

export const findToolAndMatchFromToolbox = (tools: IMarkusTool[], name: string, args: IMarkusToolArgs): IMarkusTool => {
    const tool: IMarkusTool = findToolFromToolbox(tools, name);
    const verify: boolean = tool.verify(args);
    if (!verify) {
        throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
    }
    return tool;
};
