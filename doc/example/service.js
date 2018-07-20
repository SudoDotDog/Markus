/**
 * @author WMXPY
 * @fileoverview Service
 */

const Cluster = require('cluster');
const Http = require('http');
const {
    cpus
} = require('os');

const numCPUs = cpus().length;
const isDebug = true;
const verbose = true;

const {
    Markus
} = require('../../dist/index');

const app = new Markus()
    .debug()
    .folder('F:/path')
    .crossOrigin()
    .app();

if (!isDebug) {
    if (Cluster.isMaster) {
        const thread = Math.min(Config.maxThread, numCPUs);
        for (let i = 0; i < thread; i++) {
            const worker = Cluster.fork();
            worker.send(worker.process.pid);
        }

        Cluster.on('listening', (worker, address) => {
            if (verbose) {
                console.log('worker ' + worker.process.pid + ', listen: ' + address.address + ":" + address.port);
            }
        });

        Cluster.on('exit', (worker, code, signal) => {
            if (verbose) {
                console.log('worker ' + worker.process.pid + ' died');
            }
            Cluster.fork();
        });
    } else {
        const HttpServer = Http.createServer(app);
        HttpServer.listen('8080');
    }
} else {
    const HttpServer = Http.createServer(app);
    HttpServer.listen('8080');
}