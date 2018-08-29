/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config Templates
 */

import * as Path from 'path';
import { IConfig, MODE } from "../../interface";

export const getMarkusConfigTemplate = (): IConfig => {
    return {
        host: 'mongodb://localhost:27017',
        database: 'markus-test-2',
        imagePath: 'F://path/image',
        tempPath: 'F://path/temp',
        imagePFolder: 5,
        isDebug: true,
        maxThread: 4,
        uploadLimit: 25,
        portNumber: 8080,
        verbose: false,
        white404ImagePath: Path.resolve('assets/404image_white.png'),
        black404ImagePath: Path.resolve('assets/404image_black.png'),
        mode: MODE.FILE_SYSTEM,
    };
};

export const verifyMarkusConfigKey = (key: string): boolean => {
    return true;
};
