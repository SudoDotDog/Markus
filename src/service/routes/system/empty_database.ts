/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Empty Database
 */

import { Request, RequestHandler, Response } from "express";
import { MARKUS_AUTHORIZATION_ROLE } from "../../../declare/interface";
import * as Direct from "../../../direct/import";
import { error, ERROR_CODE } from "../../../util/error/error";
import { infoLog, marks } from "../../decorator";
// tslint:disable-next-line
import { ExpressNextFunction, EXPRESS_SPECIAL_MARK, IDocInformation, IExpressRoute, ROUTE_MODE } from '../../interface';
import LodgeableExpressRoute from "../lodgeable";

@marks(EXPRESS_SPECIAL_MARK.DEBUG, EXPRESS_SPECIAL_MARK.RISKY)
@infoLog()
export default class RouteRiskyEmptyDatabase extends LodgeableExpressRoute implements IExpressRoute {
    public readonly name: string = 'MR@Internal-Route^Risky_Empty_Database';
    public readonly path: string = '/empty';
    public readonly mode: ROUTE_MODE = ROUTE_MODE.POST;

    public readonly prepare: boolean = true;
    public readonly authorization: boolean = false;
    public readonly stack: RequestHandler[] = [
        this.handle,
    ];
    public readonly after: boolean = true;
    public readonly authRole: MARKUS_AUTHORIZATION_ROLE[] = [MARKUS_AUTHORIZATION_ROLE.MANAGE];

    public readonly doc: IDocInformation = {
        name: {
            EN: 'Empty database',
        },
        description: {
            EN: 'Discard entire database!',
        },
    };

    public available(): boolean {
        if (global.Markus.Config.isDebug) {
            return true;
        }
        return false;
    }

    protected async handle(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            if (global.Markus.Config.isDebug) {
                await Direct.Clean.emptyDatabase();
            } else {
                throw error(ERROR_CODE.DEBUG_ONLY_FUNCTION_CALLED_IN_PRODUCTION);
            }
        } catch (err) {
            res.agent.failed(500, err);
        } finally {
            next();
        }
        return;
    }
}
