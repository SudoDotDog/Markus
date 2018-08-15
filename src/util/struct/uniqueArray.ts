/**
 * @author WMXPY
 * @description Structure
 * @fileoverview UniqueArray Struct
 */

import { error, ERROR_CODE } from "../error/error";

export default class UniqueArray<T> implements Iterable<T> {
    private _Array: T[];

    public constructor(init?: T | T[] | UniqueArray<T>, ...rest: T[]) {
        if (!init) {
            this._Array = [];
        } else if (init instanceof Array) {
            if (rest.length > 0) {
                throw error(ERROR_CODE.UNIQUE_ARRAY_CREATION_FAILED);
            }
            this._Array = init;
        } else {
            if (Boolean((init as any).list)) {
                this._Array = (init as UniqueArray<T>).list;
            } else {
                this._Array = [(init as T), ...rest];
            }
        }
    }

    public get list(): T[] {
        return this._Array;
    }

    public get length(): number {
        return this._Array.length;
    }

    public get first(): T | undefined {
        return this._Array[0];
    }

    public get last(): T | undefined {
        return this._Array[this.length - 1];
    }

    public find(condition: (element: T) => boolean): T | null {
        for (let i of this._Array) {
            if (condition(i)) {
                return i;
            }
        }
        return null;
    }

    public get(index: number) {
        return this._Array[index];
    }

    public set(index: number, value: T) {
        return this._Array[index] = value;
    }

    public push(...items: T[]): number {
        for (let item of items) {
            if (!this.includes(item)) {
                this._Array.push(item);
            }
        }
        return this._Array.length;
    }

    public unshift(...items: T[]): number {
        const reversedItems: T[] = [...items].reverse();
        for (let item of reversedItems) {
            if (!this.includes(item)) {
                this._Array.unshift(item);
            }
        }
        return this._Array.length;
    }

    public concat(cats: T[] | UniqueArray<T>): UniqueArray<T> {
        for (let cat of cats) {
            if (!this.includes(cat)) {
                this._Array.push(cat);
            }
        }
        return this;
    }

    public pop(): T | undefined {
        return this._Array.pop();
    }

    public shift(): T | undefined {
        return this._Array.shift();
    }

    public map(each: (value: T, index: number, list: T[]) => any): any[] {
        return this._Array.map(each);
    }

    public forEach(each: (value: T, index: number, list: T[]) => any): void {
        this._Array.forEach(each);
    }

    public includes(item: T): boolean {
        return this._Array.includes(item);
    }

    public indexOf(item: T): number {
        return this._Array.indexOf(item);
    }

    public splice(start: number, deleteCount: number, add?: T[] | UniqueArray<T>): UniqueArray<T> {
        let arrAdd: T[] = [];
        if (add && add instanceof Array) {
            arrAdd = add;
        } else if (add) {
            arrAdd = (add as UniqueArray<T>).list;
        }
        let result: T[] = [];
        if (arrAdd) {
            result = this._Array.splice(start, deleteCount, ...arrAdd);
        } else {
            result = this._Array.splice(start, deleteCount);
        }
        return new UniqueArray<T>(result);
    }

    public remove(index: number): T {
        const result: T[] = this._Array.splice(index, 1);
        return result[0];
    }

    public sort(compareFn?: (a: T, b: T) => number): UniqueArray<T> {
        const result: T[] = this._Array.sort(compareFn);
        this._Array = result;
        return this;
    }

    public clone() {
        return new UniqueArray<T>(...this._Array);
    }

    public [Symbol.iterator](): IterableIterator<T> {
        let pointer: number = 0;
        const iterator: Iterator<T> = {
            next(this: UniqueArray<T>): IteratorResult<T> {
                if (pointer >= this._Array.length) {
                    return {
                        done: true,
                        value: (null as any as T),
                    };
                } else {
                    return {
                        done: false,
                        value: this._Array[pointer++],
                    };
                }
            },
        };
        iterator.next = iterator.next.bind(this);
        return iterator as IterableIterator<T>;
    }
}
