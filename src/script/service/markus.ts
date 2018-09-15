/**
 * @author WMXPY
 * @fileoverview Single thread service
 */

require('../../binding');
import * as Http from 'http';
import { initMarkusGlobalConfig } from '../../markus';
import app from './app';
import { logWhenSoftwareStart } from './info';

initMarkusGlobalConfig();
logWhenSoftwareStart(global.Markus.Config.verbose, global.Markus.Config.isDebug);

const HttpServer: Http.Server = Http.createServer(app);
HttpServer.listen(global.Markus.Config.portNumber);
