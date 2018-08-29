/**
 * @author WMXPY
 * @fileoverview Service
 * @deprecated This should only be use when use forever instead of pm2
 */

import * as Cluster from 'cluster';
import * as Http from 'http';
import { cpus } from 'os';
import * as Path from 'path';
import { initMarkusGlobalConfig } from '../../markus';
import { error, ERROR_CODE } from '../../util/error/error';
import app from './app';
import { logWhenSoftwareStart } from './info';

initMarkusGlobalConfig();
const numCPUs: number = cpus().length;

console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');
console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');
console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');
console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');
console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');
console.log('!!! THIS IS DEPRECATED USE MARKUS INSTEAD !!!');

if (Cluster.isMaster) {
    if (!Path.isAbsolute(global.MarkusConfig.imagePath)) {
        throw error(ERROR_CODE.IMAGE_PATH_IS_NOT_ABSOLUTE);
    }

    logWhenSoftwareStart(global.MarkusConfig.verbose, global.MarkusConfig.isDebug);
}

if (!global.MarkusConfig.isDebug) {
    if (Cluster.isMaster) {
        const thread: number = Math.min(global.MarkusConfig.maxThread, numCPUs);
        for (let i: number = 0; i < thread; i++) {
            const worker: Cluster.Worker = Cluster.fork();
            worker.send(worker.process.pid);
        }

        Cluster.on('listening', (worker: Cluster.Worker, address: Cluster.Address) => {
            if (global.MarkusConfig.verbose) {
                console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ":" + address.port);
            }
        });

        Cluster.on('exit', (worker: Cluster.Worker, code: number, signal: string) => {
            if (global.MarkusConfig.verbose) {
                console.log('worker ' + worker.process.pid + ' died');
            }
            Cluster.fork();
        });
    } else {
        const HttpServer: Http.Server = Http.createServer(app);
        HttpServer.listen(global.MarkusConfig.portNumber);
    }
} else {
    const HttpServer: Http.Server = Http.createServer(app);
    HttpServer.listen(global.MarkusConfig.portNumber);
}
