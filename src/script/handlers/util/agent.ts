/**
 * @author WMXPY
 * @description Handler
 * @fileoverview Agent Util
 */

import { Response } from "express";
import { RESPONSE } from "../../../util/interface";

export class ResponseAgent {
    private _response: Response;
    private _data: {
        [key: string]: any;
    };

    public constructor(res: Response) {
        this._response = res;
        this._data = {};
    }

    public add(name: string, value: any) {
        this._data[name] = value;
    }

    public send() {
        this._response.status(200).send({
            status: RESPONSE.SUCCEED,
            data: this._data,
        });
    }
}

