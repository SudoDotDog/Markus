/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Point Icon Class
 */

import { error, ERROR_CODE } from "../../../util/error/error";

export interface IPoint {
    x: number;
    y: number;
}

export enum EDGE {
    LENGTH = 480,
    TOTAL = LENGTH * 4,
    AVAILABLE_SHIFT = Math.floor(LENGTH * 0.3),
}

export default class Point {

    private _queue: number[];
    private _outer: IPoint[];
    private _inner: IPoint[];

    public constructor() {
        this._queue = [];
        this._outer = [];
        this._inner = [];
    }

    public getPoint(key: number): IPoint {
        if (key <= EDGE.TOTAL) {
            throw error(ERROR_CODE.POINT_INTERNAL_ERROR);
        }

        let temp: number = key % EDGE.TOTAL;
        let whichEdge: number = Math.floor(temp / EDGE.LENGTH);
        let lengthLeft: number = Math.floor(temp % EDGE.LENGTH);
        let resultPoint: IPoint;

        let loop: number = 0;

        while (this.checkQueue(whichEdge)) {
            if (loop >= 5) { break; }
            if (whichEdge >= 3 || whichEdge <= 0) {
                whichEdge = 2;
            } else {
                (key + whichEdge) % 2 >= 1 ? whichEdge++ : whichEdge--;
            }
            loop++;
        }
        switch (whichEdge) {
            case 0:
                resultPoint = { x: lengthLeft, y: 0 };
                break;
            case 1:
                resultPoint = { x: EDGE.LENGTH, y: lengthLeft };
                break;
            case 2:
                resultPoint = { x: EDGE.LENGTH - lengthLeft, y: EDGE.LENGTH };
                break;
            case 3:
                resultPoint = { x: 0, y: EDGE.LENGTH - lengthLeft };
                break;

            /* istanbul ignore next */
            default:
                throw error(ERROR_CODE.EDGE_OUT_OF_BOUND);
        }
        this.pushQueue(whichEdge).touchQueue();
        this._outer.push(resultPoint);
        return resultPoint;
    }

    public getMediumPoint(point1: IPoint, point2: IPoint, key: number): IPoint {
        let x: number = Math.floor((point1.x + point2.x) / 2) + this.getKeyShift(key, EDGE.AVAILABLE_SHIFT);
        let y: number = Math.floor((point1.y + point2.y) / 2) + this.getKeyShift(key, EDGE.AVAILABLE_SHIFT);
        let resultPoint = { x, y };
        this._inner.push(resultPoint);
        return resultPoint;
    }

    public getKeyShift(key: number, limit: number): number {
        let shift = (key % limit);
        return Math.floor(shift - shift / 2);
    }

    public getRandom(limit: number): number {
        let ran: number = Math.floor(Math.random() * 1000);
        return Math.floor((ran % limit) - limit / 2);
    }

    public getEndPoint(): IPoint {
        return {
            x: EDGE.LENGTH - 25,
            y: EDGE.LENGTH - 55,
        };
    }

    public getCenterPoint(): IPoint {
        return {
            x: Math.floor(EDGE.LENGTH / 2),
            y: Math.floor(EDGE.LENGTH / 2),
        };
    }

    public getFontSize(): number {
        return Math.floor(EDGE.LENGTH / 2.4);
    }

    public getLargerFontSize(): number {
        return Math.floor(EDGE.LENGTH / 1.8);
    }

    public checkQueue(edge: number): boolean {
        for (let i of this._queue) {
            if (i === edge) {
                return true;
            }
        }
        return false;
    }

    public pushQueue(medium: number): Point {
        this._queue.push(medium);
        return this;
    }

    public touchQueue(): Point {
        if (this._queue.length >= 4) {
            this.clear();
        }
        return this;
    }

    public clear(): Point {
        this._queue = [];
        return this;
    }

}
