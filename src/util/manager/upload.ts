/**
 * @author WMXPY
 * @fileoverview Upload Management Utils
 */

import * as Path from 'path';
import Config from '../../markus';
import { mkPathDir, unique } from "../image";
import { Base64FileManager, BufferFileManager, IFileManager } from './file/import';

export default class UploadManager {
    private _currentFolder: string;
    private _count: number;

    public constructor(currentFolder?: string, currentCount?: number) {
        if (currentFolder && currentCount) {
            this._currentFolder = currentFolder;
            this._count = currentCount;
        } else {
            this._currentFolder = Path.join(Config.imagePath, unique(9));
            this._count = 0;
        }
        mkPathDir(this._currentFolder);
    }

    public generateBufferEngine() {

    }

    public generateBase64Engine() {

    }

    protected createBufferFile(buffer: Buffer): IFileManager {
        const path = this.next();
        const bufferManager = new BufferFileManager(path, this.release, buffer);
        return bufferManager;
    }

    protected createBase64File(base64: string): IFileManager {
        const path = this.next();
        const base64Manager = new Base64FileManager(path, this.release, base64);
        return base64Manager;
    }

    protected next(): string {
        if (this._count++ >= Config.uploadLimit) {
            this._currentFolder = Path.join(Config.imagePath, unique(9));
            this._count = 0;
        }
        return Path.join(this._currentFolder, unique(11));
    }

    protected release() {
        this._count--;
    }
}
