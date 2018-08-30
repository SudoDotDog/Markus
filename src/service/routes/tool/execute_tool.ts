/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Execute Tool
 */

import { Request, RequestHandler, Response } from "express";
import { MarkusExtensionConfig } from "../../../markus";
import { installToolbox } from "../../../script/handlers/tool/install";
import { findToolAndMatchFromToolbox } from "../../../script/handlers/tool/util";
import { IMarkusTool, IMarkusToolResult } from "../../../toolbox/toolbox";
import { error, ERROR_CODE } from "../../../util/error/error";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteExecuteTool implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Execute-Tool';
    public readonly path: string = '/t/execute';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;

    private _tools: IMarkusTool[];

    public constructor(installedTool?: IMarkusTool[]) {
        this._tools = installedTool ? installedTool : installToolbox(MarkusExtensionConfig);
        this.handle = this.handle.bind(this);
    }

    public available() {
        return true;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const name: string | undefined = req.body.name;
            const args: any[] = req.body.args;
            if (!name || !args) {
                throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            }

            const tool: IMarkusTool = findToolAndMatchFromToolbox(this._tools, name);
            const result: IMarkusToolResult[] = await tool.execute(...args);
            res.agent.add('result', result);
            res.agent.add('teapots', tool.teapots);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
