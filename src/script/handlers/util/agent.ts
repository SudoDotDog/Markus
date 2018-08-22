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
    private _data: {
        [key: string]: any;
    };

    public constructor(res: Response) {
        this._response = res;
        this._data = {};
        this._file = null;
        this._redirect = null;
        this._count = 0;
    }

    public add(name: string, value: any): ResponseAgent {
        if (this._file || this._redirect) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._data[name] = value;
        this._count++;
        return this;
    }

    public redirect(path: string): ResponseAgent {
        if (this._file || this._count > 0) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._redirect = path;
        return this;
    }

    public addFile(path: string): ResponseAgent {
        if (this._count > 0 || this._redirect) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._file = path;
        return this;
    }

    public send() {
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
}
