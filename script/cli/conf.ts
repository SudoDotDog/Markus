/**
 * @author WMXPY
 * @description Conf
 * @fileoverview Init
 */

import * as Fs from 'fs';
import * as Path from 'path';

const writeToPath = () => {
    Fs.writeFileSync(Path.join(__dirname, '..', '..', 'markus.conf'), getTemplate(), 'UTF8');
};

const getTemplate = (): string => {
    return JSON.stringify({
        crossOrigin: "*",
        host: "mongodb://localhost:27017",
        database: "markus",
        imagePath: "/home/Markus/Image",
        tempPath: "/home/Markus/Temp",
        imagePFolder: 5,
        isDebug: true,
        maxThread: 4,
        uploadLimit: 25,
        portNumber: 8080,
        verbose: false,
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

writeToPath();
