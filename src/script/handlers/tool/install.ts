/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool Install
 */

import * as Controller from '../../../database/controller/import';
import * as Direct from '../../../direct/import';
import { IConfig } from '../../../interface';
import { IMarkusTool } from "../../../toolbox/toolbox";

export const installToolbox = (Config: IConfig): IMarkusTool[] => {
    const tools: IMarkusTool[] = Config.tools;
    tools.forEach((tool: IMarkusTool) => {
        if (tool.controller) {
            tool.controller(Controller);
        }
        if (tool.direct) {
            tool.direct(Direct);
        }
    });
    return tools;
};
