/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Tool Install
 */

import * as Controller from '../../../database/controller/import';
import * as Direct from '../../../direct/import';
import { IMarkusExtensionConfig } from '../../../interface';
import { IMarkusTool } from "../../../toolbox/interface";

export const installToolbox = (MarkusExtensionConfig: IMarkusExtensionConfig): IMarkusTool[] => {
    const tools: IMarkusTool[] = MarkusExtensionConfig.tools;
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
