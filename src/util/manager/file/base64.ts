/**
 * @author WMXPY
 * @fileoverview Base64 File Management Utils
 */

import * as Fs from 'fs';
import { stringToMD5 } from '../../data/crypto';
import { fileBuilder } from '../../data/path';
import { error, ERROR_CODE } from '../../error';
import { IFileLink, IFileManager } from "./interface";

export default class Base64FileManager implements IFileManager {
    private _folder: string;
    private _filename: string;
    private _base64: string;
    private _mime: string;
    private _release: () => void;

    public constructor(folder: string, filename: string, release: () => void, base64: string, mime: string) {
        this._folder = folder;
        this._filename = filename;
        this._release = release;
        this._mime = mime;
        this._base64 = base64;
    }

    public save(): Promise<IFileLink> {
        return new Promise<IFileLink>((resolve: (link: IFileLink) => void, reject: (error: Error) => void) => {
            const buffer: Buffer = Buffer.from(this._base64, 'base64');
            const filepath: string = fileBuilder(this._folder, this._filename);
            Fs.writeFile(filepath, buffer, (err: Error) => {
                if (err) {
                    reject(error(ERROR_CODE.IMAGE_SAVE_FAILED));
                }
                resolve({
                    folder: this._folder,
                    filename: this._filename,
                });
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
