/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config read and updating
 */

import bkc from 'bkc';
import { ICallable, IBkcOptions } from 'bkc/dist/types/callable';
import * as Fs from 'fs';
import * as Path from 'path';
import { IMarkusConfConfig, MODE } from '../../markus';
import { error, ERROR_CODE } from '../error/error';

export const getMarkusConfigTemplate = (): IMarkusConfConfig => {
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
    }
}

export default class MarkusConfigReader {
    private _config: IMarkusConfConfig;

    public constructor() {
        this._config = getMarkusConfigTemplate();
    }

    public read() {
        const path: string = this._getConfigPath();
        const content: string = Fs.readFileSync(path, 'UTF8');
        bkc(content, this._buildConfig());
    }

    protected _getConfigPath(): string {
        return Path.join(__dirname, '..', '..', '..', 'markus.conf');
    }

    protected _buildConfig(): IBkcOptions {
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

                    const key: string = args[0];
                    const value: any = args[1];

                    this._config[key] = value;
                },
            },
        ];

        return {
            externals,
            instants: [],
            vars: [],
        }
    }
}
