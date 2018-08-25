/**
 * @author WMXPY
 * @description Struct
 * @fileoverview Fork
 */

export default class Fork<T> {
    private _list: T[];

    public constructor(list?: T[]) {
        if (list) {
            this._list = list;
        } else {
            this._list = [];
        }
    }

    public get length(): number {
        return this._list.length;
    }

    public add(element: T) {
        this._list.push(element);
    }

    public has(fn: (element: T) => boolean) {
        for (let i of this._list) {
            if (fn(i)) {
                return true;
            }
        }
        return false;
    }
}
