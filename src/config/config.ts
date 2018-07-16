/**
 * @author WMXPY
 * @fileoverview Config
 */

export interface IConfig {
    crossOrigin: string;
    db: string;
    imagePath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number;
    portNumber: number;
    verbose: boolean;
}

const Config: IConfig = {
    crossOrigin: '*',
    db: 'mongodb://localhost/markus-test',
    imagePath: 'F:/path',
    imagePFolder: 12,
    isDebug: true,
    maxThread: 4,
    portNumber: 8080,
    verbose: false,
};

export default Config;
