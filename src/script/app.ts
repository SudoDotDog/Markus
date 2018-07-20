/**
 * @author WMXPY
 * @fileoverview Express Application
 */


import * as bodyParser from "body-parser";
import * as express from "express";
import { checkUploadMiddleware, Upload } from "../util/image";
import * as Handler from './handlers/import';

export const useMiddleware = (app: express.Express, Options: {
    limit: number;
}) => {
    app.use(bodyParser.json({
        limit: Options.limit + 'mb',
    }));
    app.use(bodyParser.urlencoded({
        extended: true,
        limit: Options.limit + 'mb',
    }));
};

export const addHandlers = (app: express.Express) => {
    const uploadSingle: express.RequestHandler = Upload().single('image');

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
    app.post('/m/buffer', checkUploadMiddleware, uploadSingle, Handler.M.UploadBufferHandler);
    app.post('/m/base64', checkUploadMiddleware, Handler.M.UploadBase64Handler);

    // Handler(s) for debug
    app.post('/list', Handler.Debug.OutputImageIdList);
    app.delete('/empty', Handler.Debug.emptyDatabaseHandler);

    // Handler(s) for 404
    app.all('*', Handler.G.fourOFourHandler);
};
