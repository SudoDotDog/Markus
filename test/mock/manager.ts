/**
 * @author WMXPY
 * @fileoverview Mock Manager
 */

import { IFileManager } from "../../src/util/manager/file/import";

export default class MockManager implements IFileManager {
    private _saveCount: number;
    private _mimeCount: number;
    private _hashCount: number;
    private _releaseCount: number;

    private _path: string;
    private _hash: string;
    private _mime: string;

    public constructor(path: string, hash: string, mime: string) {
        this._hashCount = 0;
        this._mimeCount = 0;
        this._releaseCount = 0;
        this._saveCount = 0;

        this._path = path;
        this._hash = hash;
        this._mime = mime;
    }

    public async save(): Promise<string> {
        this._saveCount++;
        return this._path;
    }

    public mime(): string {
        this._mimeCount++;
        return this._mime;
    }

    public async hash(): Promise<string> {
        this._hashCount++;
        return this._hash;
    }

    public release(): void {
        this._releaseCount++;
    }

    public getSaveCount(): number {
        return this._saveCount;
    }

    public getMimeCount(): number {
        return this._mimeCount;
    }

    public getHashCount(): number {
        return this._hashCount;
    }

    public getReleaseCount(): number {
        return this._releaseCount;
    }
}
