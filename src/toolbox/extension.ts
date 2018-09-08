/**
 * @author WMXPY
 * @description Extension
 * @fileoverview Tools
 */

import { Express, Request, Response } from "express";
import Log from "../log/log";
import { MarkusExtensionConfig } from "../markus";
import { ExpressNextFunction, IExpressExtension } from '../service/interface';
import { error, ERROR_CODE } from "../util/error/error";
import { IMarkusTool, IMarkusToolboxInfo, IMarkusToolEstimate, IMarkusToolResult } from "./interface";
import { findToolAndMatchFromToolbox } from "./util/find";
import { getInformationByIMarkusTools } from "./util/parse";

export default class ExtensionTool implements IExpressExtension {
    public readonly name: string = 'ME@Internal-Extension^Tools';
    public readonly preMount: boolean = false;

    private _log: Log;
    private _tools: IMarkusTool[];

    public constructor(log: Log) {
        this._log = log;
        this._tools = MarkusExtensionConfig.tools;
    }

    public available() {
        return true;
    }

    public install(app: Express) {
        console.log(app);
    }

    protected async handleEstimate(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
        try {
            const name: string | undefined = req.body.name;
            const args: any[] = req.body.args;
            if (!name || !args) {
                throw error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED);
            }

            const tool: IMarkusTool = findToolAndMatchFromToolbox(this._tools, name);
            const result: IMarkusToolEstimate = await tool.estimate(...args);
            res.agent.add('type', result.type);
            res.agent.add('time', result.time);
            res.agent.add('teapots', tool.teapots);
        } catch (err) {
            res.agent.failed(400, err);
        } finally {
            next();
        }
        return;
    }

    protected async handleExecute(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
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

    protected async handleGet(req: Request, res: Response, next: ExpressNextFunction): Promise<void> {
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
