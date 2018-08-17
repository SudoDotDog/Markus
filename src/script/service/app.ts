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
import { ResponseAgent } from "../handlers/util/agent";

mongoose.connect(
    Config.host + '/' + Config.database,
    { useNewUrlParser: true },
);
let clientVersion: string = '?';

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
    res.agent = new ResponseAgent(res);
    next();
});

const uploadManager: UploadManager = new UploadManager();
const prepares: middleware[] = Config.middleware.prepares;
const permissions: middleware[] = Config.middleware.permissions;
const afters: middleware[] = [
    ...Config.middleware.after,
    Handler.Markus.FlushHandler,
];

// Add prepares middleware for all handlers
app.all('*', ...prepares);

// Handler(s) for user agent
app.get('/', Handler.Markus.MarkusHandler, ...afters);
app.get('/auth', ...permissions, Handler.Markus.MarkusHandler, ...afters);

// Handler(s) for Image Get
app.get('/w/:id', Handler.GetImage.imageGetBlankWhiteHandler, ...afters);
app.get('/b/:id', Handler.GetImage.imageGetBlankBlackHandler);

// Handler(s) for Image Upload
app.post('/m/buffer', uploadManager.generateMulterEngine('image'), uploadManager.generateBufferEngine(), ...permissions, Handler.Markus.UploadBufferHandler);
app.post('/m/base64', uploadManager.generateBase64Engine(), ...permissions, Handler.Markus.UploadBase64Handler);

// Handler(s) for Avatar Get
app.get('/a/:avatar', Handler.Avatar.avatarGetHandler);

// Handler(s) for Avatar Set
app.post('/v/buffer', uploadManager.generateMulterEngine('image'), uploadManager.generateBufferEngine(), ...permissions, Handler.Avatar.avatarBufferHandler);
app.post('/v/base64', uploadManager.generateBase64Engine(), ...permissions, Handler.Avatar.avatarBase64Handler);

// Handler(s) for Image List Get
app.get('/tag/:tag/compress', Handler.GetImage.imageCompressByTagHandler);
app.post('/tag', Handler.GetImage.imageGetListByTagHandler);

// Handler(s) for Tag List Get
app.post('/tag/list', ...permissions, Handler.GetImage.allTagUserFriendlyListHandler, ...afters);

// Handler(s) for Image status change
app.post('/deactivate/id', ...permissions, Handler.Markus.DeactivateImageHandler, ...afters);
app.post('/deactivate/tag', ...permissions, Handler.Markus.DeactivateTagHandler, ...afters);

// Handler(s) for debug
app.post('/list', Handler.Debug.OutputImageIdList);
app.post('/empty', Handler.Debug.emptyDatabaseHandler);

// Handler(s) for tools
app.get('/tool', Handler.Tool.markusToolboxListHandler);
app.post('/execute', ...permissions, Handler.Tool.markusToolboxExecuteHandler);

// Handler(s) for 404
app.all('*', Handler.GetImage.UnAgent_FourOFourHandler);

export default app;
