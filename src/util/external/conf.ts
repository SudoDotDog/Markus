/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config read and updating
 */

import bkc from 'bkc';
import { IBkcOptions, ICallable } from 'bkc/dist/types/callable';
import * as Fs from 'fs';
import * as Path from 'path';
import { IConfig } from '../../interface';
import { error, ERROR_CODE } from '../error/error';
import { getMarkusConfigTemplate } from './template';

export default class MarkusConfigReader {
    private _config: IConfig;

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
                        throw error(ERROR_CODE.MARKUS_CONFIG_FILE_SYNTAX_NOT_CORRECT);
                    }

                    if (args.length !== 2) {
                        throw error(ERROR_CODE.MARKUS_CONFIG_FILE_SYNTAX_NOT_CORRECT);
                    }

                    const key: keyof IConfig = args[0] as any;
                    const value: any = args[1];

                    this._config[key] = value;
                },
            },
        ];

        return {
            externals,
            instants: [],
            vars: [],
        };
    }
}
