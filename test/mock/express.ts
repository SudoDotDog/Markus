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
    header: (name: string) => string;
    headers: Array<{
        name: string;
        value: string;
    }>;
    body: {
        [key: string]: any;
    };
    query: {
        [key: string]: string;
    };
    params: {
        [key: string]: string;
    };
    [key: string]: any;
}

export interface IMockHandlerResponse {
    header: (name: string, value: string) => IMockHandlerResponse;
    send: (content: any) => void;
    sendFile: (content: any) => void;
    set: (name: string, value: string) => void;
    status: (code: number) => IMockHandlerResponse;
}

export interface IMockHandlerFlush {
    request: any;
    response: any;
    nextFunction: () => boolean;
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
            set: this.addHeader.bind(this),
            send: this.sendResultBody.bind(this),
            sendFile: this.sendResultBody.bind(this),
            status: this.setStatus.bind(this),
        };
        this._request = {
            header: this.getHeaderFromRequest.bind(this),
            headers: [],
            query: {},
            params: {},
            body: {},
        };
    }

    public request(name: string, value: any): MockHandler {
        this._request[name] = value;
        return this;
    }

    public header(name: string, value: string): MockHandler {
        this._request.headers.push({
            name,
            value,
        });
        return this;
    }

    public query(name: string, value: string): MockHandler {
        this._request.query[name] = value;
        return this;
    }

    public param(name: string, value: string): MockHandler {
        this._request.params[name] = value;
        return this;
    }

    public body(name: string, value: any): MockHandler {
        this._request.body[name] = value;
        return this;
    }

    public flush(): IMockHandlerFlush {
        return {
            request: this._request,
            response: this._response,
            nextFunction: this.nextFunction.bind(this),
        };
    }

    public end(): IMockHandlerResult {
        return this._result;
    }

    protected nextFunction(): boolean {
        this._result.body = 'done';
        return true;
    }

    protected getHeaderFromRequest(name: string): string {
        for (let i of this._request.headers) {
            if (i.name === name) {
                return i.value;
            }
        }
        return '';
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
