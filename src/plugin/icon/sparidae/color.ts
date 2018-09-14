/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Color Icon Class
 */

import { error, ERROR_CODE } from '../../../util/error/error';

export default class Color {
    private _list: string[];
    private _pointer: number;

    public constructor(list: string[]) {
        this._list = list;
        this._pointer = 0;
    }

    public rgba(): () => string {
        return (): string => {
            if (!Boolean(this._list[this._pointer])) {
                this._pointer = 0;
            }
            return this.parseHEXToRGBA(this._pointer++);
        };
    }

    private parseHEXToRGBA(location: number): string {
        let color: string = this._list[location];
        if (color.substring(0, 1) === "#") {
            color = color.substring(1, color.length);
        }
        if (color.length !== 6) {
            throw error(ERROR_CODE.INTERNAL_ERROR);
        }

        let result: string = "rgba(";
        for (let i: number = 0; i < color.length; i += 2) {
            result += parseInt(color.substring(i, i + 2), 16).toString();
            result += ", ";
        }
        result += "0.3)";
        return result;
    }
}
