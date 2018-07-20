/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import Config from "../config/config";
import { checkUploadMiddleware, Upload } from "../util/image";
import * as Handler from './handlers/import';

mongoose.connect(Config.db);

const db: mongoose.Connection = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));

const app: express.Express = express();
app.use(bodyParser.json({
    limit: '18mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '18mb',
}));
app.use(express.json({ limit: '50mb' }));
const uploadSingle = Upload().single('image');

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", Config.crossOrigin);
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", "1.1.1");
    next();
});

// Handler(s) for Image Get
// app.get('/g/:id', Handler.G.imageGetHandler); // You should not use this method
app.get('/w/:id', Handler.G.imageGetBlankWhiteHandler);
app.get('/b/:id', Handler.G.imageGetBlankBlackHandler);

// Handler(s) for Image List Get
app.post('/tag', Handler.G.imageGetListByTagHandler);
app.post('/original', Handler.G.imageGetListByOriginalNameHandler);

// Handler(s) for Image status change
app.post('/deactive/id', checkUploadMiddleware, Handler.M.DeactiveImageHandler);
app.post('/deactive/tag', checkUploadMiddleware, Handler.M.DeactiveTagHandler);

// Handler(s) for Image Upload
app.post('/m/buffer', uploadSingle, checkUploadMiddleware, Handler.M.UploadBufferHandler);
app.post('/m/base64', checkUploadMiddleware, Handler.M.UploadBase64Handler);

// Handler(s) for debug
app.post('/list', Handler.Debug.OutputImageIdList);
app.delete('/empty', Handler.Debug.emptyDatabaseHandler);

// Handler(s) for 404
app.all('*', Handler.G.fourOFourHandler);

export default app;
