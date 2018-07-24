/**
 * @author WMXPY
 * @fileoverview Upload Management Utils
 */

import { NextFunction, Request, Response } from 'express';
import * as Multer from 'multer';
import * as Path from 'path';
import Config, { middleware } from '../../markus';
import { error, ERROR_CODE, handlerError } from '../error';
import { mkPathDir, unique } from "../image";
import { Base64FileManager, BufferFileManager, IFileManager } from './file/import';

declare global {
    namespace Express {
        // tslint:disable-next-line
        interface Request {
            manager: IFileManager;
        }
    }
}

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

    public generateMulterEngine(form: string): middleware {
        const storage: Multer.StorageEngine = Multer.memoryStorage();
        return Multer({
            storage,
        }).single(form);
    }

    public generateBufferEngine(): middleware {
        const bufferToManagerMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const file: Express.Multer.File = req.file;
            if (file) {
                req.manager = this.createBufferFile(file.buffer, file);
                next();
                return;
            } else {
                handlerError(res, error(ERROR_CODE.IMAGE_NOT_UPLOADED));
            }
        };
        return bufferToManagerMiddleware;
    }

    public generateBase64Engine(): middleware {
        const base64ToManagerMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const base64 = req.body.image;
            if (base64) {
                req.manager = this.createBase64File(base64);
                next();
                return;
            } else {
                handlerError(res, error(ERROR_CODE.IMAGE_NOT_UPLOADED));
            }
        };
        return base64ToManagerMiddleware;
    }

    public createBufferFile(buffer: Buffer, file: Express.Multer.File): IFileManager {
        const path = this.next(file.mimetype);
        const bufferManager = new BufferFileManager(path, this.release, buffer, file.mimetype);
        return bufferManager;
    }

    public createBase64File(base64: string): IFileManager {
        const splited: string[] = base64.split(';');
        const data: string = splited[1].replace(/^base64,/, "");
        const mime = splited[0].split(":")[1];
        const path = this.next(mime);
        const base64Manager = new Base64FileManager(path, this.release, data, mime);
        return base64Manager;
    }

    protected next(mime: string): string {
        const splited: string[] = mime.split('/');
        const type: string = splited.length >= 2 ? splited[1] : 'jpeg';
        if (this._count++ >= Config.uploadLimit) {
            this._currentFolder = Path.join(Config.imagePath, unique(9));
            this._count = 0;
        }
        return Path.join(this._currentFolder, unique(11) + '.' + type);
    }

    protected release() {
        this._count--;
    }
}
