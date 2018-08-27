/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config read and updating
 */

import bkc from 'bkc';
import { ICallable } from 'bkc/dist/types/callable';
import * as Fs from 'fs';
import * as Path from 'path';
import { IMarkusConfConfig, MODE } from '../../markus';
import { error, ERROR_CODE } from '../error/error';

export const getMarkusConfigTemplate = (): IMarkusConfConfig => {
    return {
        crossOrigin: '*',
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
    }
}

export default class MarkusConfigReader {
    private _config: IMarkusConfConfig;

    public constructor(){
        this._config = getMarkusConfigTemplate();
    }
    
    protected _buildConfig() {
        const externals: ICallable[] = [
            {
                command: 'set',
                func: (args: string[]) => {
                    if (!(args instanceof Array)) {
                        throw error(ERROR_CODE.MARKUS_CONFIG_FILE_SYNTEX_NOT_CORRECT);
                    }

                    if (args.length !== 2) {
                        throw error(ERROR_CODE.MARKUS_CONFIG_FILE_SYNTEX_NOT_CORRECT);
                    }


                }
            }
        ]
    }
}



export const readMarkusConfFileSync = () => {
    const path: string = getConfFilePath();
    const content: string = Fs.readFileSync(path, 'UTF8');
    bkc(content, {
        externals: [
            {
                command: 'hello',
                func: (args: string[]) => {
                    console.log(args);
                }
            }
        ],
        instants: [
            {
                command: 'yy',
                func: (arg) => {
                    return 1 + arg;
                }
            }
        ]
    });
};

export const getConfFilePath = (): string => {
    return Path.join(__dirname, '..', '..', '..', 'markus.conf');
};
