/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Tools
 */

import { Express, Request, RequestHandler, Response } from "express";
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
            const args: IMarkusToolArgs = req.body.args;
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
            const args: IMarkusToolArgs = req.body.args;
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

    protected buildRoute(handler: RequestHandler): RequestHandler[] {
        return [
            ...MarkusExtensionConfig.middleware.prepares,
            ...MarkusExtensionConfig.middleware.permissions,
            handler,
            ...MarkusExtensionConfig.middleware.after,
            toolboxExtensionFlushHandler,
        ];
    }
}

// public readonly assertResponse: IExpressAssertionJSONType = {
//     tools: {
//         type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
//         child: {
//             type: EXPRESS_ASSERTION_TYPES_UNION.OBJECT,
//             child: {
//                 name: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
//                 description: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
//                 require: {
//                     type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
//                     child: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
//                 },
//                 teapots: {
//                     type: EXPRESS_ASSERTION_TYPES_UNION.ARRAY,
//                     child: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
//                 },
//             },
//         },
//     },
// };
