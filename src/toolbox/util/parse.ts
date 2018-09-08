/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Parse Util
 */

import { IMarkusTool, IMarkusToolboxInfo } from "../interface";

export const getInformationByIMarkusTools = (tools: IMarkusTool[]): IMarkusToolboxInfo[] => {
    return tools.map((tool: IMarkusTool): IMarkusToolboxInfo => {
        return {
            name: tool.name,
            description: tool.description,
            require: tool.require,
            teapots: tool.teapots,
        };
    });
};
