/**
 * @author WMXPY
 * @fileoverview Base64 File Management Utils
 */

import * as Fs from 'fs';
import { stringToMD5 } from '../../data/crypto';
import { error, ERROR_CODE } from '../../error';
import { IFileManager } from "./interface";

export default class Base64FileManager implements IFileManager {
    private _path: string;
    private _base64: string;
    private _mime: string;
    private _release: () => void;

    public constructor(path: string, release: () => void, base64: string, mime: string) {
        this._path = path;
        this._release = release;
        this._mime = mime;
        this._base64 = base64;
    }

    public save(): Promise<string> {
        return new Promise<string>((resolve: (path: string) => void, reject: (error: Error) => void) => {
            const buffer: Buffer = Buffer.from(this._base64, 'base64');
            Fs.writeFile(this._path, buffer, (err: Error) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve(this._path);
            });
        });
    }

    public mime(): string {
        return this._mime;
    }

    public async hash(): Promise<string> {
        const hash: string = stringToMD5(this._base64);
        return hash;
    }

    public release(): void {
        this._release();
    }
}
