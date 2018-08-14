/**
 * @author WMXPY
 * @description Handler Util
 * @fileoverview Tool Util
 */

import { IMarkusTool } from "../../../toolbox/toolbox";
import { error, ERROR_CODE } from "../../../util/error/error";

export const findToolFromToolbox = (tools: IMarkusTool[], name: string): IMarkusTool => {
    for (let tool of tools) {
        if (tool.name === name) {
            return tool;
        }
    }
    throw error(ERROR_CODE.TARGET_TOOL_NOT_FOUND);
};

export const findToolAndMatchFromToolbox = (tools: IMarkusTool[], name: string, ...args: any[]): IMarkusTool => {
    const tool: IMarkusTool = findToolFromToolbox(tools, name);
    const verify: boolean = tool.verify(...args);
    if (!verify) {
        throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
    }
    return tool;
};
