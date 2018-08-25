/**
 * @author WMXPY
 * @description Mock
 * @fileoverview Mock Markus Tool
 */

import { IConfig } from "../../src/markus";
import * as MarkusTool from "../../src/toolbox/toolbox";

export class MockMarkusTool implements MarkusTool.IMarkusTool {
    public readonly name: string;
    public readonly description: string;
    public readonly require: MarkusTool.MARKUS_TOOL_REQUIRE_TYPE[];
    public teapots: MarkusTool.IMarkusToolTeapot[];

    public shouldVerify: boolean = false;

    private _controller: MarkusTool.MarkusController;
    private _direct: MarkusTool.MarkusDirect;

    public constructor(
        name: string,
        description: string = 'mock markus tool',
        require: MarkusTool.MARKUS_TOOL_REQUIRE_TYPE[] = [],
        teapots: MarkusTool.IMarkusToolTeapot[] = [],
    ) {
        this.name = name;
        this.description = description;
        this.require = require;
        this.teapots = teapots;

        this.shouldVerify = true;

        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: MarkusTool.MarkusController) {
        this._controller = controller;
    }

    public direct(direct: MarkusTool.MarkusDirect) {
        this._direct = direct;
    }

    public available(config: IConfig) {
        return true;
    }

    public verify(): boolean {
        return this.shouldVerify;
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
