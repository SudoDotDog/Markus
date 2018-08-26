/**
 * @author WMXPY
 * @description Logs
 * @fileoverview Logs class
 */

import { appropriateDateStringWithTime } from "../util/data/date";
import { LOG_MODE } from "./interface";

export default class Log {
    private _mode: LOG_MODE;
    private _func: (content: string) => void;

    public constructor(mode: LOG_MODE) {
        this._mode = mode;
        this._func = console.log;
    }

    public func(func: (content: string) => void): Log {
        this._func = func;
        return this;
    }

    public error(str: string): Log {
        this.expect([
            LOG_MODE.ERROR,
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ]);
        this._func(`[ERR!] ${appropriateDateStringWithTime(new Date())} ${str}`);
        return this;
    }

    public warning(str: string): Log {
        this.expect([
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ]);
        this._func(`[WARN] ${appropriateDateStringWithTime(new Date())} ${str}`);
        return this;
    }

    public info(str: string): Log {
        this.expect([
            LOG_MODE.INFO,
        ]);
        this._func(`[INFO] ${appropriateDateStringWithTime(new Date())} ${str}`);
        return this;
    }

    protected expect(modes: LOG_MODE[]): boolean {
        if (this._mode === LOG_MODE.ALL) {
            return true;
        }
        if (modes.includes(this._mode)) {
            return true;
        }
        return false;
    }
}
