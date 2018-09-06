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
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_ASSERTION_TYPES_END, EXPRESS_ASSERTION_TYPES_UNION, IDocInformation, IExpressAssertionJSONType, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../../lodgeable";

export default class RouteGetTool extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Get-Tool';
    public readonly path: string = '/t';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.GET;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = true;
    public readonly stack: RequestHandler[];
    public readonly after: boolean = true;

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Get tool',
        },
        description: {
            EN: 'Get the list of tools',
        },
    };
    public readonly assertResponse: IExpressAssertionJSONType = {
        tools: {
            type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
            child: {
                name: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                description: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
                require: {
                    type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
                    child: EXPRESS_ASSERTION_TYPES_END.STRING,
                },
                teapots: {
                    type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
                    child: EXPRESS_ASSERTION_TYPES_END.STRING,
                },
            },
        },
    };

    private _tools: IMarkusTool[];

    public constructor(installedTool?: IMarkusTool[]) {
        super();
        this._tools = installedTool ? installedTool : installToolbox(MarkusExtensionConfig);
        this.handle = this.handle.bind(this);
        this.stack = [
            this.handle,
        ];
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
