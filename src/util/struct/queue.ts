/**
 * @author WMXPY
 * @description Struct
 * @fileoverview Queue
 */

import { error, ERROR_CODE } from "../error/error";

export default class Queue<K, T> {
    private _limit: number;
    private _queue: Array<{
        name: K;
        value: T;
    }>;

    public constructor(limit: number) {
        this._limit = limit;
        this._queue = [];
    }

    public get length(): number {
        return this._queue.length;
    }

    public get array(): T[] {
        return this._queue.map((element: {
            name: K;
            value: T;
        }) => element.value);
    }

    public add(name: K, value: T): void {
        const result: T | null = this._rummage(name);
        if (!result) {
            this._push(name, value);
        }
    }

    public has(name: K): boolean {
        for (let i of this._queue) {
            if (name === i.name) {
                return true;
            }
        }
        return false;
    }

    public get(name: K): T | null {
        return this._rummage(name);
    }

    protected _push(name: K, value: T): void {
        this._queue.push({
            name,
            value,
        });
        if (this._queue.length > this._limit) {
            this._queue.shift();
        }
    }

    protected _rummage(target: K): T | null {
        for (let i = 0; i < this._queue.length; i++) {
            if (target === this._queue[i].name) {
                const spliced = this._queue.splice(i, 1);
                if (spliced.length < 1) {
                    throw error(ERROR_CODE.QUEUE_ELEMENT_NOT_EXIST);
                }
                const { name, value } = spliced[0];
                this._push(name, value);
                return value;
            }
        }
        return null;
    }
}
