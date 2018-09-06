/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { middleware } from '../../interface';
import { LOG_MODE } from "../../log/interface";
import Log from '../../log/log';
import { initMarkusGlobalConfig, MarkusExtensionConfig } from "../../markus";
import ExpressBuilder from "../../service/builder";
import * as Extension from '../../service/extension/import';
import * as Route from '../../service/routes/import';
import { SERVICE_ROUTE_UPLOAD_BUFFER_MODE } from "../../service/routes/upload/upload_buffer";
import UploadManager from '../../util/manager/upload';
import { markusVersion } from "../../util/struct/agent";
import * as Handler from '../handlers/import';
import { ResponseAgent } from "../handlers/util/agent";

initMarkusGlobalConfig();

const log: Log = new Log(global.MarkusConfig.isDebug ? LOG_MODE.VERBOSE : LOG_MODE.WARNING);
mongoose.connect(
    global.MarkusConfig.host + '/' + global.MarkusConfig.database,
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
const appBuilder: ExpressBuilder = new ExpressBuilder(app, log);

appBuilder.use(new Extension.ExtensionDocGenerate(log));

app.use(bodyParser.json({
    limit: global.MarkusConfig.uploadLimit + 'mb',
}));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: global.MarkusConfig.uploadLimit + 'mb',
}));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    req.log = log;

    if (global.MarkusConfig.crossOrigin) {
        res.header("Access-Control-Allow-Origin", global.MarkusConfig.crossOrigin);
    }
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", clientVersion);
    res.agent = new ResponseAgent(res, log);
    next();
});

const uploadManager: UploadManager = new UploadManager();
const prepares: middleware[] = MarkusExtensionConfig.middleware.prepares;
const permissions: middleware[] = MarkusExtensionConfig.middleware.permissions;
const afters: middleware[] = [
    ...MarkusExtensionConfig.middleware.after,
    Handler.Markus.FlushHandler,
];

// Handler(s) for user agent
appBuilder.route(new Route.RouteRoot().setLog(log));
appBuilder.route(new Route.RouteAuth());

// Handler(s) for Image Get
app.get('/w/:id', ...prepares, Handler.GetImage.imageGetBlankWhiteHandler, ...afters);
app.get('/b/:id', ...prepares, Handler.GetImage.imageGetBlankBlackHandler, ...afters);

// Handler(s) for Image Upload
appBuilder.route(new Route.RouteUploadByBuffer(
    SERVICE_ROUTE_UPLOAD_BUFFER_MODE.IMAGE,
    '/m/buffer',
    'Image',
    uploadManager.generateMulterEngine('image'),
    uploadManager.generateBufferEngine(),
));
app.post('/m/base64', ...prepares, uploadManager.generateBase64Engine(), ...permissions, Handler.Markus.UploadBase64Handler);

// Handler(s) for Avatar Get
appBuilder.route(new Route.RouteGetAvatar());

// Handler(s) for Avatar Set
appBuilder.route(new Route.RouteUploadByBuffer(
    SERVICE_ROUTE_UPLOAD_BUFFER_MODE.AVATAR,
    '/v/buffer',
    'Avatar',
    uploadManager.generateMulterEngine('image'),
    uploadManager.generateBufferEngine(),
));
app.post('/v/base64', ...prepares, uploadManager.generateBase64Engine(), ...permissions, Handler.Avatar.avatarBase64Handler);

// Handler(s) for Image List Get
appBuilder.route(new Route.RouteCompressByTag().setLog(log));
appBuilder.route(new Route.RouteRenameTag());
app.post('/tag', ...prepares, Handler.GetImage.imageGetListByTagHandler);

// Handler(s) for Tag List Get
appBuilder.route(new Route.RouteTagList());

// Handler(s) for Image status change
app.post('/deactivate/id', ...prepares, ...permissions, Handler.Markus.DeactivateImageHandler, ...afters);
app.post('/deactivate/tag', ...prepares, ...permissions, Handler.Markus.DeactivateTagHandler, ...afters);

// Handler(s) for debug
app.post('/list', ...prepares, Handler.Debug.OutputImageIdList);
app.post('/empty', ...prepares, Handler.Debug.emptyDatabaseHandler);

// Handler(s) for tools
appBuilder.route(new Route.RouteGetTool());
appBuilder.route(new Route.RouteEstimateTool());
app.post('/execute', ...prepares, ...permissions, Handler.Tool.markusToolboxExecuteHandler);

// Handler(s) for 404
appBuilder.route(new Route.RouteFourOFour());

const expressApp: express.Express = appBuilder.flush();
export default expressApp;
