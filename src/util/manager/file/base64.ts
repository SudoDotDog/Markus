/**
 * @author WMXPY
 * @fileoverview Base64 File Management Utils
 */

import * as Fs from 'fs';
import { error, ERROR_CODE } from '../../error';
import { IFileManager } from "./interface";

export default class Base64FileManager implements IFileManager {
    private _path: string;
    private _base64: string;
    private _release: () => void;

    public constructor(path: string, release: () => void, base64: string) {
        this._path = path;
        this._release = release;
        this._base64 = base64;
    }

    public save(): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (error: Error) => void) => {
            const splited: string[] = this._base64.split(';');
            // const type: string = splited[0].split('/')[1];
            const data: string = splited[1].replace(/^base64,/, "");
            Fs.writeFile(this._path, new Buffer(data, 'base64'), (err: Error) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve();
            });
        });
    }

    public release(): void {
        this._release();
    }
}
