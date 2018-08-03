/**
 * @author WMXPY
 * @fileoverview Single thread service
 */

import * as Http from 'http';
import Config from '../../markus';
import app from './app';
import { logWhenSoftwareStart } from './info';

logWhenSoftwareStart(Config.verbose, Config.isDebug);

const HttpServer: Http.Server = Http.createServer(app);
HttpServer.listen(Config.portNumber);
