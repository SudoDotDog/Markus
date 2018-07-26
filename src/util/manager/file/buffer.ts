/**
 * @author WMXPY
 * @fileoverview Buffer File Management Utils
 */

import * as Fs from 'fs';
import { hashBuffer } from '../../data/crypto';
import { fileBuilder } from '../../data/path';
import { error, ERROR_CODE } from '../../error';
import { IFileLink, IFileManager } from "./interface";

export default class BufferFileManager implements IFileManager {
    private _folder: string;
    private _filename: string;
    private _buffer: Buffer;
    private _mime: string;
    private _release: () => void;

    public constructor(folder: string, filename: string, release: () => void, buffer: Buffer, mime: string) {
        this._folder = folder;
        this._filename = filename;
        this._release = release;
        this._buffer = buffer;
        this._mime = mime;
    }

    public save(): Promise<IFileLink> {
        return new Promise<IFileLink>((resolve: (path: IFileLink) => void, reject: (err: Error) => void) => {
            const filepath: string = fileBuilder(this._folder, this._filename);
            const writeStream: Fs.WriteStream = Fs.createWriteStream(filepath);
            writeStream.on('error', (err: Error) => {
                reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
            });
            writeStream.on('finish', () => {
                resolve({
                    folder: this._folder,
                    filename: this._filename,
                });
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
