/**
 * @author WMXPY
 * @fileoverview Service
 */

import * as Cluster from 'cluster';
import * as Http from 'http';
import { cpus } from 'os';
import Config from '../config/config';
import app from './app';

const numCPUs: number = cpus().length;

if (!Config.isDebug) {
    if (Cluster.isMaster) {
        for (let i = 0; i < numCPUs; i++) {
            const worker: Cluster.Worker = Cluster.fork();
            worker.send(worker.process.pid);
        }

        Cluster.on('listening', (worker: Cluster.Worker, address: Cluster.Address) => {
            console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ":" + address.port);
        });

        Cluster.on('exit', (worker: Cluster.Worker, code: number, signal: string) => {
            console.log('worker ' + worker.process.pid + ' died');
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
