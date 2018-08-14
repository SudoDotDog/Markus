/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as OS from 'os';
import { IMarkusResult, IMarkusTool, MARKUS_REQUIRE_TYPE, MARKUS_RESPONSE_TYPE, MarkusController, MarkusDirect } from "../toolbox";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public name: string = "@Internal:Environment-Information";
    public description: string = "Return Environment Information";
    public require: MARKUS_REQUIRE_TYPE[] = [];

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

    public verify(): boolean {
        return true;
    }

    public async execute(): Promise<IMarkusResult[]> {
        const cpus: number = OS.cpus.length;
        return [{
            type: MARKUS_RESPONSE_TYPE.STRING,
            name: 'CPUS',
            value: cpus,
        }];
    }
}
