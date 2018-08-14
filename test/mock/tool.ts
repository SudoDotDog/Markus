/**
 * @author WMXPY
 * @description Mock
 * @fileoverview Mock Markus Tool
 */

import {
    IMarkusResult,
    IMarkusTool,
    MARKUS_REQUIRE_TYPE,
    MarkusController,
    MarkusDirect,
} from "../../src/toolbox/toolbox";

export class MockMarkusTool implements IMarkusTool {
    public name: string;
    public description: string;
    public require: MARKUS_REQUIRE_TYPE[];

    private _controller: MarkusController;
    private _direct: MarkusDirect;

    public constructor(name: string, description: string, require: MARKUS_REQUIRE_TYPE[]) {
        this.name = name;
        this.description = description;
        this.require = require;

        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: MarkusController) {
        this._controller = controller;
    }

    public direct(direct: MarkusDirect) {
        this._direct = direct;
    }

    public verify(): boolean {
        return true;
    }

    public async execute(): Promise<IMarkusResult[]> {
        return [];
    }
}
