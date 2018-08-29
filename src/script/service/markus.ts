/**
 * @author WMXPY
 * @fileoverview Single thread service
 */

import * as Http from 'http';
import { initMarkusGlobalConfig } from '../../markus';
import app from './app';
import { logWhenSoftwareStart } from './info';

initMarkusGlobalConfig();
logWhenSoftwareStart(global.MarkusConfig.verbose, global.MarkusConfig.isDebug);

const HttpServer: Http.Server = Http.createServer(app);
HttpServer.listen(global.MarkusConfig.portNumber);
