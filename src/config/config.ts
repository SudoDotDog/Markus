/**
 * @author WMXPY
 * @fileoverview Config
 */

import * as Path from 'path';

export interface IConfig {
    crossOrigin: string;
    db: string;
    imagePath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number;
    portNumber: number;
    key: string;
    verbose: boolean;
    white404ImagePath: string;
    black404ImagePath: string;
}

const Config: IConfig = {
    crossOrigin: '*',
    db: 'mongodb://localhost/markus-test',
    imagePath: 'F:/path',
    imagePFolder: 12,
    isDebug: true,
    maxThread: 4,
    portNumber: 8080,
    key: 'test',
    verbose: false,
    white404ImagePath: Path.resolve('assets/404image_white.png'),
    black404ImagePath: Path.resolve('assets/404image_black.png'),
};

export default Config;
