/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Generator Icon Class
 */

import { stringToMD5 } from "../../../util/data/crypto";

export default class Generator {
    private _medium: string;

    public constructor(str: string) {
        this._medium = stringToMD5(str);
    }

    public raw(): string {
        return this._medium;
    }

    public splice(start: number, stop: number): number {
        return parseInt(this._medium.substring(start, stop), 16);
    }
}
