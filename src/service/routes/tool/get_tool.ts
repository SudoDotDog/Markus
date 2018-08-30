/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Get Tool
 */

import { Request, RequestHandler, Response } from "express";
import { MarkusExtensionConfig } from "../../../markus";
import { installToolbox } from "../../../script/handlers/tool/install";
import { IMarkusTool, IMarkusToolboxInfo } from "../../../toolbox/toolbox";
import { getInformationByIMarkusTools } from "../../../toolbox/util/parse";
import { ExpressNextFunction, IExpressRoute, ROUTE_MODE } from '../../interface';

export default class RouteGetTool implements IExpressRoute {
    public readonly name: string = 'MR@Internal:Route^Get-Tool';
    public readonly path: string = '/t';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;

    private _tools: IMarkusTool[];

    public constructor(installedTool?: IMarkusTool[]) {
        this._tools = installedTool? installedTool : installToolbox(MarkusExtensionConfig);
        this.handle = this.handle.bind(this);
    }

    public available() {
        return true;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const info: IMarkusToolboxInfo[] = getInformationByIMarkusTools(this._tools);
            res.agent.add('tools', info);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }
}
