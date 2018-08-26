/**
 * @author WMXPY
 * @description Logs
 * @fileoverview Logs class
 */

import { appropriateDateStringWithTime } from "../util/data/date";
import { LOG_MODE } from "./interface";

export default class Log {
    private _mode: LOG_MODE;
    private _count: number;
    private _func: (content: string) => void;

    public constructor(mode: LOG_MODE) {
        this._mode = mode;
        this._count = 0;
        this._func = this._buildFunc(console.log);
    }

    public get count(): number {
        return this._count;
    }

    public get length(): number {
        return this._count;
    }

    public func(func: (content: string) => void): Log {
        this._func = this._buildFunc(func);
        return this;
    }

    public error(str: string): Log {
        if (this._expect([
            LOG_MODE.ERROR,
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ])) {
            this._func(`[ERR!] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public warning(str: string): Log {
        if (this._expect([
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ])) {
            this._func(`[WARN] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public info(str: string): Log {
        if (this._expect([
            LOG_MODE.INFO,
        ])) {
            this._func(`[INFO] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    protected _buildFunc(func: (content: string) => void): (content: string) => void {
        return (content: string): void => {
            this._count++;
            func(content);
        };
    }

    protected _expect(modes: LOG_MODE[]): boolean {
        if (this._mode === LOG_MODE.ALL) {
            return true;
        }
        if (modes.includes(this._mode)) {
            return true;
        }
        return false;
    }
}
