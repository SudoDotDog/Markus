/**
 * @author WMXPY
 * @description Logs
 * @fileoverview Logs class
 */

import { appropriateDateStringWithTime } from "../../util/data/date";
import { LOG_MODE } from "./interface";

export default class Log {
    private _mode: LOG_MODE;
    private _count: number;
    private _func: (content: string) => void;

    private _buffer: Map<string, number>;
    private _interval: number;
    private _intervalCleaner: NodeJS.Timer | null;

    public constructor(mode: LOG_MODE) {
        this._mode = mode;
        this._count = 0;

        this._buffer = new Map<string, number>();
        this._interval = 5000;
        this._intervalCleaner = null;
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

    public critical(str: string): Log {
        if (this._expect([
            LOG_MODE.CRITICAL,
            LOG_MODE.ERROR,
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
            LOG_MODE.DEBUG,
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[CRIT] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public error(str: string): Log {
        if (this._expect([
            LOG_MODE.ERROR,
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
            LOG_MODE.DEBUG,
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[ERRO] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public warning(str: string): Log {
        if (this._expect([
            LOG_MODE.WARNING,
            LOG_MODE.INFO,
            LOG_MODE.DEBUG,
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[WARN] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public info(str: string): Log {
        if (this._expect([
            LOG_MODE.INFO,
            LOG_MODE.DEBUG,
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[INFO] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public debug(str: string): Log {
        if (this._expect([
            LOG_MODE.DEBUG,
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[DBUG] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    public verbose(str: string): Log {
        if (this._expect([
            LOG_MODE.VERBOSE,
        ])) {
            this._func(`[VERB] ${appropriateDateStringWithTime(new Date())} ${str}`);
        }
        return this;
    }

    protected _buildFunc(func: (content: string) => void): (content: string) => void {
        if (this._intervalCleaner) {
            clearInterval(this._intervalCleaner);
        }
        this._intervalCleaner = setInterval(() => {
            this._buffer.forEach((value: number, key: string) => {
                let content: string;
                if (value === 1) {
                    content = key;
                } else {
                    content = key + ' MULTIPLE: ' + value;
                }
                func(content);
            });
            this._buffer.clear();
        }, this._interval);
        return (content: string): void => {
            this._count++;
            if (this._buffer.has(content)) {
                const count = this._buffer.get(content) as number;
                this._buffer.set(content, count + 1);
            } else {
                this._buffer.set(content, 1);
            }
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
