/**
 * @author WMXPY
 * @fileoverview Upload Management Utils
 */

import { NextFunction, Request, Response } from 'express';
import * as Multer from 'multer';
import { middleware } from '../../interface';
import { error, ERROR_CODE, handlerError } from '../error/error';
import { unique } from "../image";
import { Base64FileManager, BufferFileManager, IFileManager } from './file/import';

export default class UploadManager {
    private _currentFolder: string;
    private _count: number;

    public constructor(currentFolder?: string, currentCount?: number) {
        if (currentFolder && currentCount) {
            this._currentFolder = currentFolder;
            this._count = currentCount;
        } else {
            this._currentFolder = unique(9);
            this._count = 0;
        }
    }

    public generateMulterEngine(form: string): middleware {
        const storage: Multer.StorageEngine = Multer.memoryStorage();
        return Multer({
            storage,
        }).single(form);
    }

    public generateBufferEngine(): middleware {
        /* istanbul ignore next */
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
        /* istanbul ignore next */
        const base64ToManagerMiddleware: middleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            const base64: string = req.body.image;
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
        const { folder, filename } = this.next(file.mimetype);
        const bufferManager: IFileManager = new BufferFileManager(folder, filename, this.release, buffer, file.mimetype);
        return bufferManager;
    }

    public createBase64File(base64: string): IFileManager {
        const splited: string[] = base64.split(';');
        const data: string = splited[1].replace(/^base64,/, "");
        const mime: string = splited[0].split(":")[1];
        const { folder, filename } = this.next(mime);
        const base64Manager: IFileManager = new Base64FileManager(folder, filename, this.release, data, mime);
        return base64Manager;
    }

    protected next(mime: string): {
        folder: string;
        filename: string;
    } {
        const splited: string[] = mime.split('/');
        const type: string = splited.length >= 2 ? splited[1] : 'jpeg';
        if (++this._count >= global.Markus.Config.imagePFolder) {
            this._currentFolder = unique(9);
            this._count = 0;
        }
        return {
            folder: this._currentFolder,
            filename: unique(11) + '.' + type,
        };
    }

    /* istanbul ignore next */
    protected release() {
        this._count--;
    }
}
