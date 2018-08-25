/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Agent Util
 */

import { Response } from "express";
import { error, ERROR_CODE } from "../../../util/error/error";
import { RESPONSE } from "../../../util/interface";

export class ResponseAgent {
    private _response: Response;
    private _file: string | null;
    private _redirect: string | null;
    private _count: number;
    private _failed: {
        code: number;
        err: Error;
    } | null;
    private _data: {
        [key: string]: any;
    };

    public constructor(res: Response) {
        this._response = res;
        this._data = {};
        this._file = null;
        this._redirect = null;
        this._failed = null;
        this._count = 0;
    }

    public add(name: string, value: any): ResponseAgent {
        this.checkFailed();
        if (this._file || this._redirect) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._data[name] = value;
        this._count++;
        return this;
    }

    public smartFileSend(path: string): ResponseAgent {
        if (path.substring(0, 4) === 'http') {
            this.redirect(path);
        } else {
            this.addFile(path);
        }
        return this;
    }

    public redirect(path: string): ResponseAgent {
        this.checkFailed();
        if (this._file || this._count > 0) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._redirect = path;
        return this;
    }

    public addFile(path: string): ResponseAgent {
        this.checkFailed();
        if (this._file) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_CAN_ONLY_SEND_ONE_FILE);
        }
        if (this._count > 0 || this._redirect) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._file = path;
        return this;
    }

    public failed(code: number, err: Error): ResponseAgent {
        this._failed = {
            code,
            err,
        };
        return this;
    }

    public send() {
        console.log(this._failed);
        if (this._failed) {
            this._response.status(this._failed.code).send({
                status: RESPONSE.FAILED,
                error: this._failed.err,
            });
            return;
        }

        if (this._file) {
            this._response.status(200).sendFile(this._file);
        } else if (this._redirect) {
            this._response.redirect(this._redirect);
        } else {
            this._response.status(200).send({
                status: RESPONSE.SUCCEED,
                data: this._data,
            });
        }
    }

    protected checkFailed() {
        if (this._failed) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_ALREADY_FAILED);
        }
    }
}
