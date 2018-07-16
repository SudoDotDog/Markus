/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import * as Path from 'path';
import Config from '../config/config';
import { error, ERROR_CODE } from "../util/error";
import { Upload } from "../util/image";
import * as Handler from './handlers/import';

if (!Path.isAbsolute(Config.imagePath)) {
    throw error(ERROR_CODE.IMAGE_PATH_IS_NOT_ABSOLUTE);
}

mongoose.connect('mongodb://localhost/markus-test');

const db: mongoose.Connection = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));

const app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const uploadSingle = Upload().single('image');

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", "1.0.0");
    next();
});

// Handler(s) for Image Get
app.get('/g/:id', Handler.G.imageGetHandler);
app.get('/w/:id', Handler.G.imageGetBlankWhiteHandler);
app.get('/b/:id', Handler.G.imageGetBlankBlackHandler);

// Handler(s) for Image Upload
app.post('/m/buffer', uploadSingle, Handler.M.UploadBufferHandler);
app.post('/m/base64', Handler.M.UploadBase64Handler);

// Handler(s) for 404
app.post('*', Handler.G.fourOFourHandler);

export default app;
