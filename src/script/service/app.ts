/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { middleware } from '../../interface';
import Config from "../../markus";
import UploadManager from '../../util/manager/upload';
import { markusVersion } from "../../util/struct/agent";
import * as Handler from '../handlers/import';

mongoose.connect(Config.host + '/' + Config.database);
let clientVersion: string;

markusVersion().then((version: string) => {
    clientVersion = version;
}).catch((err: Error) => {
    clientVersion = 'X';
    console.log(err);
});

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

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", Config.crossOrigin);
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", clientVersion);
    next();
});

const prepares: middleware[] = Config.middleware.prepares;
const permissions: middleware[] = Config.middleware.permissions;

const uploadManager: UploadManager = new UploadManager();

// Handler(s) for Image Get
app.get('/w/:id', ...prepares, Handler.GetImage.imageGetBlankWhiteHandler);
app.get('/b/:id', ...prepares, Handler.GetImage.imageGetBlankBlackHandler);

// Handler(s) for Image Upload
app.post('/m/buffer', ...prepares, uploadManager.generateMulterEngine('image'), uploadManager.generateBufferEngine(), ...permissions, Handler.Markus.UploadBufferHandler);
app.post('/m/base64', ...prepares, uploadManager.generateBase64Engine(), ...permissions, Handler.Markus.UploadBase64Handler);

// Handler(s) for Avatar Get
app.get('/a/:avatar', ...prepares, Handler.Avatar.avatarGetHandler);

// Handler(s) for Avatar Set
app.post('/v/buffer', ...prepares, uploadManager.generateMulterEngine('image'), uploadManager.generateBufferEngine(), ...permissions, Handler.Avatar.avatarBufferHandler);
app.post('/v/base64', ...prepares, uploadManager.generateBase64Engine(), ...permissions, Handler.Avatar.avatarBase64Handler);

// Handler(s) for Image List Get
app.post('/tag', ...prepares, Handler.GetImage.imageGetListByTagHandler);

// Handler(s) for Image status change
app.post('/deactivate/id', ...prepares, ...permissions, Handler.Markus.DeactivateImageHandler);
app.post('/deactivate/tag', ...prepares, ...permissions, Handler.Markus.DeactivateTagHandler);

// Handler(s) for debug
app.post('/list', ...prepares, Handler.Debug.OutputImageIdList);
app.post('/empty', ...prepares, Handler.Debug.emptyDatabaseHandler);

// Handler(s) for agent
app.get('/', ...prepares, Handler.Markus.MarkusHandler);
app.get('/auth', ...prepares, ...permissions, Handler.Markus.MarkusHandler);

// Handler(s) for 404
app.all('*', ...prepares, Handler.GetImage.fourOFourHandler);

export default app;
