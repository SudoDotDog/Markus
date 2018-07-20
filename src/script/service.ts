/**
 * @author WMXPY
 * @fileoverview Service
 */

import * as Cluster from 'cluster';
import * as Http from 'http';
import { cpus } from 'os';
import * as Path from 'path';
import Config from '../markus';
import { error, ERROR_CODE } from '../util/error';
import app from './app';

if (!Path.isAbsolute(Config.imagePath)) {
    throw error(ERROR_CODE.IMAGE_PATH_IS_NOT_ABSOLUTE);
}

if (Config.isDebug) {
    console.log('!!! YOU ARE RUNNING THIS APPLICATION IN DEBUG MODE !!!');
    console.log('!!!   MAKE SURE TO CHANGE IT TO PRODUCTION MODE    !!!');
}

if (Config.verbose) {
    console.log("My name is Markus; I am one of them; These are your images!");
}

const numCPUs: number = cpus().length;

if (!Config.isDebug) {
    if (Cluster.isMaster) {
        const thread: number = Math.min(Config.maxThread, numCPUs);
        for (let i: number = 0; i < thread; i++) {
            const worker: Cluster.Worker = Cluster.fork();
            worker.send(worker.process.pid);
        }

        Cluster.on('listening', (worker: Cluster.Worker, address: Cluster.Address) => {
            if (Config.verbose) {
                console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ":" + address.port);
            }
        });

        Cluster.on('exit', (worker: Cluster.Worker, code: number, signal: string) => {
            if (Config.verbose) {
                console.log('worker ' + worker.process.pid + ' died');
            }
            Cluster.fork();
        });
    } else {
        const HttpServer: Http.Server = Http.createServer(app);
        HttpServer.listen(Config.portNumber);
    }
} else {
    const HttpServer: Http.Server = Http.createServer(app);
    HttpServer.listen(Config.portNumber);
}
