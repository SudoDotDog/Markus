/**
 * @author WMXPY
 * @description Mock
 * @fileoverview Mock Markus Tool
 */

import * as MarkusTool from "../../src/toolbox/toolbox";

export class MockMarkusTool implements MarkusTool.IMarkusTool {
    public name: string;
    public description: string;
    public require: MarkusTool.MARKUS_TOOL_REQUIRE_TYPE[];

    private _controller: MarkusTool.MarkusController;
    private _direct: MarkusTool.MarkusDirect;

    public constructor(name: string, description: string, require: MarkusTool.MARKUS_TOOL_REQUIRE_TYPE[]) {
        this.name = name;
        this.description = description;
        this.require = require;

        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: MarkusTool.MarkusController) {
        this._controller = controller;
    }

    public direct(direct: MarkusTool.MarkusDirect) {
        this._direct = direct;
    }

    public verify(): boolean {
        return true;
    }

    public async estimate(): Promise<MarkusTool.IMarkusToolEstimate> {
        return {
            time: 0,
            type: MarkusTool.MARKUS_TOOL_ESTIMATE_TYPE.IMMEDIATE,
        };
    }

    public async execute(): Promise<MarkusTool.IMarkusToolResult[]> {
        return [];
    }
}
