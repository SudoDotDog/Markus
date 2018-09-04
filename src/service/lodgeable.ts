/**
 * @author WMXPY
 * @description Route Log
 * @fileoverview Log class
 */

import Log from "../log/log";

export default class LodgeableExpressRoute {
    private _log: Log | undefined;
    public constructor() {
        this._log = undefined;
    }

    public setLog(log: Log): void {
        this._log = log;
    }

    protected verbose(str: string) {
        if (this._log) {
            this._log.verbose(str);
        }
    }
}
