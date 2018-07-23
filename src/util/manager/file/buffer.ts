/**
 * @author WMXPY
 * @fileoverview Buffer File Management Utils
 */

import * as Fs from 'fs';
import { error, ERROR_CODE } from '../../error';
import { IFileManager } from "./interface";

export default class BufferFileManager implements IFileManager {
    private _path: string;
    private _buffer: Buffer;
    private _release: () => void;

    public constructor(path: string, release: () => void, buffer: Buffer) {
        this._path = path;
        this._release = release;
        this._buffer = buffer;
    }

    public save(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (err: Error) => void) => {
            const writeStream = Fs.createWriteStream(this._path);
            writeStream.on('error', (err: Error) => {
                reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
            });
            writeStream.on('finish', () => {
                resolve();
            });
            writeStream.write(this._buffer);
            writeStream.end();
        });
    }

    public release(): void {
        this._release();
    }
}
