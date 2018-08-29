/**
 * @author WMXPY
 * @description Doc Template
 * @fileoverview Style Builder
 */

import UniqueArray from "../../util/struct/uniqueArray";
import { IDocStyle } from "../interface";

export default class StyleBuilder {
    private _styles: UniqueArray<IDocStyle>;

    public constructor() {
        this._styles = new UniqueArray<IDocStyle>();
    }
}
