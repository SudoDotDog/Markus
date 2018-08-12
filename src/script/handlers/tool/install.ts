/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool Install
 */

import * as Controller from '../../../database/controller/import';
import * as Direct from '../../../direct/import';
import Config from '../../../markus';
import { IMarkusTool } from "../../../toolbox/toolbox";

export const installToolbox = (): IMarkusTool[] => {
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
