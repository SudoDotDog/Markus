/**
 * @author WMXPY
 * @description Mock
 * @fileoverview Mock Express Middleware requirements
 */

export interface IMockHandlerResult {
    status: number;
    header: Array<{
        name: string;
        value: string;
    }>;
    body: any;
}

export interface IMockHandlerRequest {
    header: Array<{
        name: string;
        value: string;
    }>;
    body: {
        [key: string]: any,
    };
    [key: string]: any,
}

export interface IMockHandlerResponse {
    header: (name: string, value: string) => IMockHandlerResponse;
    send: (content: any) => void;
    status: (code: number) => IMockHandlerResponse;
}

export interface IMockHandlerFlush {
    request: any;
    response: any;
}

export class MockHandler {
    private _request: IMockHandlerRequest;
    private _response: IMockHandlerResponse;

    private _result: IMockHandlerResult;

    public constructor() {
        this._result = {
            status: 0,
            header: [],
            body: null,
        };
        this._response = {
            header: this.addHeader.bind(this),
            send: this.sendResultBody.bind(this),
            status: this.setStatus.bind(this),
        };
        this._request = {
            header: [],
            body: {},
        }
    }

    public request(name: string, value: any): MockHandler {
        this._request[name] = value;
        return this;
    }

    public header(name: string, value: string): MockHandler {
        this._request.header.push({
            name,
            value,
        });
        return this;
    }

    public body(name: string, value:any): MockHandler {
        this._request.body[name] = value;
        return this;
    }

    public flush(): IMockHandlerFlush {
        return {
            request: this._request,
            response: this._response,
        };
    }

    public end(): IMockHandlerResult {
        return this._result;
    }

    protected addHeader(name: string, value: string): IMockHandlerResponse {
        this._result.header.push({
            name,
            value,
        });
        return this._response;
    }

    protected sendResultBody(info: any): void {
        this._result.body = info;
    }

    protected setStatus(code: number): IMockHandlerResponse {
        this._result.status = code;
        return this._response;
    }
}
