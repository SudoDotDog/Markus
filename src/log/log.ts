/**
 * @author WMXPY
 * @description Logs
 * @fileoverview Logs class
 */

import { appropriateDateStringWithTime } from "../util/data/date";
import { LOG_MODE } from "./interface";

export default class Log {
    private _mode: LOG_MODE;

    public constructor(mode: LOG_MODE) {
        this._mode = mode;
    }

    public error(str: string): Log {
        this.expect([
            LOG_MODE.ERROR,
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ]);
        console.log(`[ERR!] ${appropriateDateStringWithTime(new Date())} ${str}`);
        return this;
    }

    public warning(str: string): Log {
        this.expect([
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
        ]);
        console.log(`[WARN] ${appropriateDateStringWithTime(new Date())} ${str}`);
        return this;
    }

    public info(str: string): Log {
        this.expect([
            LOG_MODE.INFO,
        ]);
        console.log(`[INFO] ${appropriateDateStringWithTime(new Date())} ${str}`);
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
