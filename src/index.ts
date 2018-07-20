/**
 * @author WMXPY
 * @fileoverview Markus
 */

import * as express from "express";
import * as mongoose from "mongoose";
import * as path from 'path';
import { addHandlers, useMiddleware } from "./script/app";
import { error, ERROR_CODE } from "./util/error";

export class Markus {
    private _crossOrigin: string = '';
    private _imageFolder: string = '';
    private _imageFolderLimit: number = 128;
    private _isDebug: boolean = false;
    private _uploadLimit: number = 18;
    private _app: express.Express = express();
    private _version: string = "2.0.0";
    private _emptyImage: {
        white?: string;
        black?: string;
    } = {};

    public folder(folderPath: string, limit: number): Markus {
        this._imageFolder = folderPath;
        this._imageFolderLimit = limit;
        return this;
    }

    public crossOrigin(domains?: string[]): Markus {
        if (domains && domains.length > 0) {
            this._crossOrigin = '*';
        } else {
            this._crossOrigin = '*';
        }
        return this;
    }

    public debug(): Markus {
        this._isDebug = true;
        return this;
    }

    public uploadLimit(limit: number): Markus {
        this._uploadLimit = limit;
        return this;
    }

    public app(): express.Express {
        this._app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (this._crossOrigin) {
                res.header("Access-Control-Allow-Origin", this._crossOrigin);
            }
            res.header("X-Powered-By", 'Markus');
            res.header("X-Markus-Version", this._version);
            (req as any).emptyImage = this._emptyImage;
            next();
        });
        useMiddleware(this._app, {
            limit: this._uploadLimit,
        });
        addHandlers(this._app);
        if (!path.isAbsolute(this._imageFolder)) {
            throw error(ERROR_CODE.IMAGE_PATH_IS_NOT_ABSOLUTE);
        }
        if (this._isDebug) {
            console.log('!!! YOU ARE RUNNING THIS APPLICATION IN DEBUG MODE !!!');
            console.log('!!!   MAKE SURE TO CHANGE IT TO PRODUCTION MODE    !!!');
        }
        return this._app;
    }

    // public async prepare(): Promise<void> {
    //     await mongoose.connect(this._dbLink);
    //     this._dbConnection = mongoose.connection;
    //     this._dbConnection.on('error', () => {
    //         throw error(ERROR_CODE.DATABASE_CONNECTION_FAILED);
    //     });


    //     return;
    // }
}
