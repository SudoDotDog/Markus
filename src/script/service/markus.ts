/**
 * @author WMXPY
 * @fileoverview Single thread service
 */

import * as Http from 'http';
import Config from '../../markus';
import app from './app';

if (Config.isDebug) {
    console.log('!!! YOU ARE RUNNING THIS APPLICATION IN DEBUG MODE !!!');
    console.log('!!!   MAKE SURE TO CHANGE IT TO PRODUCTION MODE    !!!');
}

if (Config.verbose) {
    console.log("My name is Markus; I am one of them; These are your images!");
}

const HttpServer: Http.Server = Http.createServer(app);
HttpServer.listen(Config.portNumber);
