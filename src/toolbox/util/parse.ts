/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Parse Util
 */

import { IExpressAssertionJSONType } from "../../service/interface";
import { IMarkusTool, IMarkusToolArgs, IMarkusToolboxInfo } from "../interface";

export const getInformationByIMarkusTools = (tools: IMarkusTool[]): IMarkusToolboxInfo[] => {
    return tools.map((tool: IMarkusTool): IMarkusToolboxInfo => {
        return {
            name: tool.name,
            nickname: tool.nickname,
            description: tool.description,
            require: tool.require,
        };
    });
};

export const matchMarkusToolPattern = (pattern: IExpressAssertionJSONType, args: IMarkusToolArgs) => {
    for (let key of Object.keys(pattern)) {
        if (!args[key]) {
            return false;
        }
    }
    return true;
};
