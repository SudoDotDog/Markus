/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Merge Tags
 */

import { IConfig, MODE } from '../../interface';
import * as toolbox from "../toolbox";

export default class InternalToolMergeTag implements toolbox.IMarkusTool {
    public readonly name: string = "MT@Internal:Tool^Merge-Tags";
    public readonly description: string = "Merge tags to a different tag";
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

    public async estimate(database: string): Promise<toolbox.IMarkusToolEstimate> {
        return {
            time: 0,
            type: toolbox.MARKUS_TOOL_ESTIMATE_TYPE.TIME,
        };
    }

    public async execute(database: string): Promise<toolbox.IMarkusToolResult[]> {
        return [];
    }
}
