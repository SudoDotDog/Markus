/**
 * @author WMXPY
 * @fileoverview Markus
 */

import * as express from "express";
import * as mongoose from "mongoose";
import * as path from 'path';
import { addHandlers, useMiddleware } from "./script/app";
import { error, ERROR_CODE } from "./util/error";

export interface IMarkus {
    crossOrigin: string;
    db: string;
    imagePath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number;
    portNumber: number;
    key: string;
    verbose: boolean;
    white404ImagePath: string;
    black404ImagePath: string;
}

export class Markus {
    private _crossOrigin: string;
    private _imageFolder: string;
    private _imageFolderLimit: number;
    private _isDebug: boolean;
    private _verbose: boolean;
    private _uploadLimit: number;
    private _app: express.Express;
    private _emptyImage: {
        white: string;
        black: string;
    };

    public constructor() {
        this._uploadLimit = 18;
        this._verbose = false;
        this._imageFolderLimit = 128;
    }

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

    public verbose(): Markus {
        this._verbose = true;
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

    public host(port: number): express.Express {
        this._app = express();
        this._app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
            if (this._crossOrigin) {
                res.header("Access-Control-Allow-Origin", this._crossOrigin);
            }
            res.header("X-Powered-By", 'Markus');
            res.header("X-Markus-Version", "1.2.0");
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
        if (this._verbose) {
            console.log("My name is Markus; I am one of them; These are your images!");
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
