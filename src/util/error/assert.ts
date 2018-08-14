/**
 * @author WMXPY
 * @description Error Handling
 * @fileoverview Assert
 */

import { ERROR_CODE, error } from "./error";

class Assert<T> {
    private _elements: T[];
    private _reverse: boolean;

    public constructor(element: T) {
        this._elements = [element];
        this._reverse = false;
    }

    public get to(): Assert<T> {
        return this;
    }

    public get be(): Assert<T> {
        return this;
    }

    public get not(): Assert<T> {
        this._reverse = true;
        return this;
    }

    public and(element: T): Assert<T> {
        this._elements.push(element);
        return this;
    }

    public exist(code: ERROR_CODE = ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST): boolean {
        for (let element of this._elements) {
            if (this._reverse) {
                if (element != null && element != undefined) {
                    throw error(code);
                }
            } else {
                if (element == null || element == undefined) {
                    throw error(code);
                }
            }
        }
        return true;
    }
}

export const assert = <T>(element: T) => {
    return new Assert<T>(element);
};
