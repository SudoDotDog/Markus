/**
 * @author WMXPY
 * @fileoverview Base64 File Management Utils
 */

import { stringToMD5 } from '../../data/crypto';
import { getSaveImageByBufferFunction, ImageSaveFunction } from '../save';
import { IFileLink, IFileManager } from "./interface";

const saveImageByBuffer: ImageSaveFunction = getSaveImageByBufferFunction();

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

    public async save(): Promise<IFileLink> {
        const buffer: Buffer = Buffer.from(this._base64, 'base64');
        const link: IFileLink = await saveImageByBuffer(this._folder, this._filename, buffer);
        return link;
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
