/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import Config from "../markus";
import { Upload } from "../util/image";
import * as Handler from './handlers/import';

mongoose.connect(Config.db);

const db: mongoose.Connection = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));

const app: express.Express = express();
app.use(bodyParser.json({
    limit: Config.uploadLimit + 'mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: Config.uploadLimit + 'mb',
}));

const uploadSingle = Upload().single('image');

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", Config.crossOrigin);
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", "2.0.0");
    next();
});

const prepares = Config.middleware.prepares;
const permissions = Config.middleware.permissions;

// Handler(s) for Image Get
app.get('/w/:id', ...prepares, Handler.G.imageGetBlankWhiteHandler);
app.get('/b/:id', ...prepares, Handler.G.imageGetBlankBlackHandler);

// Handler(s) for Image Get
app.get('/a/:avator', ...prepares, Handler.G.imageGetBlankWhiteHandler);
app.get('/b/:id', ...prepares, Handler.G.imageGetBlankBlackHandler);

// Handler(s) for Image List Get
app.post('/tag', ...prepares, Handler.G.imageGetListByTagHandler);

// Handler(s) for Image status change
app.post('/deactive/id', ...prepares, ...permissions, Handler.M.DeactiveImageHandler);
app.post('/deactive/tag', ...prepares, ...permissions, Handler.M.DeactiveTagHandler);

// Handler(s) for Image Upload
app.post('/m/buffer', ...prepares, uploadSingle, ...permissions, Handler.M.UploadBufferHandler);
app.post('/m/base64', ...prepares, ...permissions, Handler.M.UploadBase64Handler);

// Handler(s) for debug
app.post('/list', ...prepares, Handler.Debug.OutputImageIdList);
app.delete('/empty', ...prepares, Handler.Debug.emptyDatabaseHandler);

// Handler(s) for 404
app.all('*', ...prepares, Handler.G.fourOFourHandler);

export default app;
