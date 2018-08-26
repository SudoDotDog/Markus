/**
 * @author WMXPY
 * @description Logs
 * @fileoverview Log to a file
 */

import * as Fs from 'fs';
import * as Path from 'path';
import { mkPathDir } from '../util/data/file';
import { error, ERROR_CODE } from '../util/error/error';
import Log from './log';

export default class FileLogAgent {
    private _path: string;
    private _stream: Fs.WriteStream;
    private _logAgent: Log | null;

    public constructor(path: string) {
        this._path = Path.resolve(path);
        mkPathDir(Path.dirname(this._path));
        this._stream = Fs.createWriteStream(path);
        this._logAgent = null;

        this.logError = this.logError.bind(this);
        this.logInfo = this.logInfo.bind(this);
        this.onError = this.onError.bind(this);
        this.func = this.func.bind(this);

        this._stream.on('finish', this.logInfo);
        this._stream.on('error', this.onError);
    }

    public func(content: string): void {
        if (!this._stream.writable) {
            throw error(ERROR_CODE.LOG_STREAM_NOT_WRITABLE);
        }
        this._stream.write(content, 'UTF8', (err: Error | null | undefined) => {
            if (err) {
                throw err;
            }
        });
    }

    public end(): void {
        this._stream.end();
    }

    protected onError(err: Error): void {
        this.logError(err.toString());
        throw err;
    }

    protected logInfo(content: string): void {
        if (this._logAgent) {
            this._logAgent.info(content);
        }
    }

    protected logError(content: string): void {
        if (this._logAgent) {
            this._logAgent.error(content);
        }
    }
}
