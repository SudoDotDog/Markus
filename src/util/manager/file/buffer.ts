/**
 * @author WMXPY
 * @fileoverview Buffer File Management Utils
 */

import * as Fs from 'fs';
import { error, ERROR_CODE } from '../../error';
import { hashBuffer } from '../../image';
import { IFileManager } from "./interface";

export default class BufferFileManager implements IFileManager {
    private _path: string;
    private _buffer: Buffer;
    private _mime: string;
    private _release: () => void;

    public constructor(path: string, release: () => void, buffer: Buffer, mime: string) {
        this._path = path;
        this._release = release;
        this._buffer = buffer;
        this._mime = mime;
    }

    public save(): Promise<string> {
        return new Promise<string>((resolve: (path: string) => void, reject: (err: Error) => void) => {
            const writeStream: Fs.WriteStream = Fs.createWriteStream(this._path);
            writeStream.on('error', (err: Error) => {
                reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
            });
            writeStream.on('finish', () => {
                resolve(this._path);
            });
            writeStream.write(this._buffer);
            writeStream.end();
        });
    }

    public mime(): string {
        return this._mime;
    }

    public async hash(): Promise<string> {
        const hash: string = await hashBuffer(this._buffer);
        return hash;
    }

    public release(): void {
        this._release();
    }
}
