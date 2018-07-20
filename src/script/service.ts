/**
 * @author WMXPY
 * @fileoverview Service
 */

import * as Cluster from 'cluster';
import * as Http from 'http';
import { cpus } from 'os';
import * as Path from 'path';
import Config from '../config/config';
import { error, ERROR_CODE } from '../util/error';

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
