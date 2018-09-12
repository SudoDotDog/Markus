/**
 * @author WMXPY
 * @description Conf
 * @fileoverview Init
 */

import * as Fs from 'fs';
import * as Path from 'path';

export const writeToPath = () => {
    const path: string = Path.join(__dirname, '..', '..', 'markus.conf');
    if (Fs.existsSync(path)) {
        console.log(`[ERRO] Markus conf file already exist`);
        process.exit();
    }
    Fs.writeFileSync(path, getTemplate(), 'UTF8');
};

export const getTemplate = (): string => {
    return JSON.stringify({
        crossOrigin: "*",
        host: "mongodb://localhost:27017",
        database: "markus",
        documentation: true,
        imagePath: "/home/Markus/Image",
        tempPath: "/home/Markus/Temp",
        imagePFolder: 5,
        isDebug: true,
        maxThread: 4,
        uploadLimit: 25,
        portNumber: 8080,
        verbose: false,
        authorization: {
            manage: [],
            host: [
                'test',
            ],
        },
        white404ImagePath: "assets/404image_white.png",
        black404ImagePath: "assets/404image_black.png",
        mode: "FILESYSTEM",
        S3: {
            bucket: "",
            accessKeyId: "",
            secretAccessKey: "",
            getPath: "",
        },
    }, null, 2);
};

if (process.argv[3] === 'external') {
    writeToPath();
}
