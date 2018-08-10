/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Tag Deduplicate
 */

import { IMarkusTool, MarkusController, MarkusDirect } from "../interface";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public name: string = "Internal-Tag-Duplicate-Remover";
    public description: string = "Remove duplicate tags";

    private _controller: MarkusController;
    private _direct: MarkusDirect;

    public controller(controller: MarkusController) {
        this._controller = controller;
    }

    public direct(direct: MarkusDirect) {
        this._direct = direct;
    }
}
