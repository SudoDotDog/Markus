/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as OS from 'os';
import { IConfig } from '../../interface';
import * as toolbox from "../toolbox";

export default class InternalToolTagDeduplicate implements toolbox.IMarkusTool {
    public readonly name: string = "MT@Internal:Environment-Information";
    public readonly description: string = "Return Environment Information";
    public readonly require: toolbox.MARKUS_TOOL_REQUIRE_TYPE[] = [];
    public teapots: toolbox.IMarkusToolTeapot[] = [];

    private _controller: toolbox.MarkusController;
    private _direct: toolbox.MarkusDirect;

    public constructor() {
        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: toolbox.MarkusController): void {
        this._controller = controller;
    }

    public direct(direct: toolbox.MarkusDirect): void {
        this._direct = direct;
    }

    public available(config: IConfig): boolean {
        return true;
    }

    public verify(): boolean {
        return true;
    }

    public async estimate(): Promise<toolbox.IMarkusToolEstimate> {
        return {
            time: 0,
            type: toolbox.MARKUS_TOOL_ESTIMATE_TYPE.IMMEDIATE,
        };
    }

    public async execute(): Promise<toolbox.IMarkusToolResult[]> {
        const cpus: number = OS.cpus.length;
        return [{
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'CPUS',
            value: cpus,
        }];
    }
}
