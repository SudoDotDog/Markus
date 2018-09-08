/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Merge Tags
 */

import { IConfig, MODE } from '../../interface';
// tslint:disable-next-line
import { IMarkusTool, IMarkusToolEstimate, IMarkusToolResult, IMarkusToolTeapot, MarkusController, MarkusDirect, MARKUS_TOOL_ESTIMATE_TYPE, MARKUS_TOOL_REQUIRE_TYPE } from "../interface";

export default class InternalToolMergeTag implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Merge-Tags";
    public readonly nickname: string = 'Marge-Tags';
    public readonly description: string = "Merge tags to a different tag";
    public readonly require: MARKUS_TOOL_REQUIRE_TYPE[] = [];
    public teapots: IMarkusToolTeapot[] = [];

    private _controller: MarkusController;
    private _direct: MarkusDirect;

    public constructor() {
        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: MarkusController): void {
        this._controller = controller;
    }

    public direct(direct: MarkusDirect): void {
        this._direct = direct;
    }

    public available(config: IConfig): boolean {
        if (config.mode === MODE.FILE_SYSTEM) {
            return true;
        }
        return false;
    }

    public verify(database: string): boolean {
        if (!database) {
            return false;
        }
        return true;
    }

    public async estimate(database: string): Promise<IMarkusToolEstimate> {
        return {
            time: 0,
            type: MARKUS_TOOL_ESTIMATE_TYPE.TIME,
        };
    }

    public async execute(database: string): Promise<IMarkusToolResult[]> {
        return [];
    }
}
