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

    public get list(): T[] {
        return this._list;
    }

    public add(element: T): Fork<T> {
        this._list.push(element);
        return this;
    }

    public has(fn: (element: T) => boolean): boolean {
        for (let i of this._list) {
            if (fn(i)) {
                return true;
            }
        }
        return false;
    }
}
