/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Agent Util
 */

import { Response } from "express";
import { RESPONSE } from "../../../util/interface";
import { error, ERROR_CODE } from "../../../util/error/error";

export class ResponseAgent {
    private _response: Response;
    private _file: string | null;
    private _count: number;
    private _data: {
        [key: string]: any;
    };

    public constructor(res: Response) {
        this._response = res;
        this._data = {};
        this._file = null;
        this._count = 0;
    }

    public add(name: string, value: any) {
        if (this._file) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._data[name] = value;
        this._count++;
    }

    public addFile(path: string) {
        if (this._count > 0) {
            throw error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE);
        }
        this._file = path;
    }

    public send() {
        if (this._file) {
            this._response.status(200).sendFile(this._file);
        } else {
            this._response.status(200).send({
                status: RESPONSE.SUCCEED,
                data: this._data,
            });
        }
    }
}
