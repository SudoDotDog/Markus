/**
 * @author WMXPY
 * @fileoverview Express Application
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";
import { error, ERROR_CODE } from "./util/error";
import * as Handler from './handlers/import';
import { RESPONSE } from './util/interface';

mongoose.connect('mongodb://localhost/markus-test');

const db: mongoose.Connection = mongoose.connection;
db.on('error', console.log.bind(console, 'connection error:'));

const app: express.Express = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("X-Powered-By", 'Markus');
    res.header("X-Markus-Version", "1.0.0");
    next();
});

/**
 * 404
 */
app.post('*', Handler.G.fourOFourHandler);

export default app;
