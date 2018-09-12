/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Tools
 */

import { Express, NextFunction, Request, RequestHandler, Response } from "express";
import { MARKUS_AUTHORIZATION_ROLE } from "../declare/interface";
import Log from "../log/log";
import { MarkusExtensionConfig } from "../markus";
import { ExpressNextFunction, IExpressExtension } from '../service/interface';
import { assert } from "../util/error/assert";
import { error, ERROR_CODE, handlerError } from "../util/error/error";
import { IMarkusTool, IMarkusToolArgs, IMarkusToolboxInfo, IMarkusToolResult } from "./interface";
import { findToolAndMatchFromToolbox } from "./util/find";
import { getInformationByIMarkusTools } from "./util/parse";

export const toolboxExtensionFlushHandler: RequestHandler = (req: Request, res: Response): void => {
    try {
        if (res.agent) {
            res.agent.send();
        } else {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }
    } catch (err) {
        handlerError(res, err, req.log);
    }
    return;
};

export default class ExtensionToolboxExtension implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Tools';
    public readonly preMount: boolean = false;

    private _log: Log;
    private _tools: IMarkusTool[];

    public constructor(log: Log) {
        this._log = log;
        this._tools = MarkusExtensionConfig.tools;

        this.handleGet = this.handleGet.bind(this);
        this.handleEstimate = this.handleEstimate.bind(this);
        this.handleExecute = this.handleExecute.bind(this);
        this.buildRoute = this.buildRoute.bind(this);
        this.createAuthRoleHandler = this.createAuthRoleHandler.bind(this);
    }

    public available() {
        return true;
    }

    public install(app: Express) {
        app.post('/t', ...this.buildRoute(this.handleGet));
        app.post('/t/:nickname/estimate', ...this.buildRoute(this.handleEstimate));
        app.post('/t/:nickname/execute', ...this.buildRoute(this.handleExecute));
    }

    protected async handleEstimate(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const name: string = req.params.nickname;
            let args: IMarkusToolArgs = req.body.args;
            if (typeof args === 'string') {
                args = JSON.parse(args);
            }
            assert(name).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            assert(args).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            this._log.info(`Tool estimating ${name}`);

            const tool: IMarkusTool = findToolAndMatchFromToolbox(this._tools, name, args);
            const result: number = await tool.estimate(args);
            res.agent.add('time', result);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected async handleExecute(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const name: string = req.params.nickname;
            let args: IMarkusToolArgs = req.body.args;
            if (typeof args === 'string') {
                args = JSON.parse(args);
            }
            assert(name).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            assert(args).to.be.exist(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            this._log.info(`Tool executing ${name}`);

            const tool: IMarkusTool = findToolAndMatchFromToolbox(this._tools, name, args);
            const result: IMarkusToolResult[] = await tool.execute(args);
            res.agent.add('result', result);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected async handleGet(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            assert(req.valid).to.be.true(ERROR_CODE.PERMISSION_VALID_FAILED);
            const info: IMarkusToolboxInfo[] = getInformationByIMarkusTools(this._tools);
            res.agent.add('tools', info);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected createAuthRoleHandler(position: MARKUS_AUTHORIZATION_ROLE[]): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            req.authRole = position;
            next();
            return;
        };
    }

    protected buildRoute(handler: RequestHandler): RequestHandler[] {
        const authRoleHandler = this.createAuthRoleHandler([MARKUS_AUTHORIZATION_ROLE.MANAGE]);
        return [
            authRoleHandler,
            ...MarkusExtensionConfig.middleware.prepares,
            ...MarkusExtensionConfig.middleware.permissions,
            handler,
            ...MarkusExtensionConfig.middleware.after,
            toolboxExtensionFlushHandler,
        ];
    }
}
