/**
 * @author PCXPY
 * @deprecated External Utils
 * @fileoverview Config read and updating
 */

import { IBkcOptions, ICallable } from 'bkc/dist/types/callable';
import * as Fs from 'fs';
import * as Path from 'path';
import { IConfig, IConfigTemplate } from '../../interface';
import { error, ERROR_CODE } from '../error/error';
import { getMarkusConfigTemplate, checkIsInTemplate, checkConfigTemplate } from './template';

export default class MarkusConfigReader {
    private _template: IConfigTemplate;
    private _config: Partial<IConfig>;

    public constructor() {
        this._template = getMarkusConfigTemplate();
        this._config = {};
    }

    public read(): IConfig {
        const path: string = this._getConfigPath();
        const content: string = Fs.readFileSync(path, 'UTF8');
        const conf: Partial<IConfig> = JSON.parse(content);
        if (checkConfigTemplate(conf)) {
            return conf as IConfig;
        } else {
            throw error(ERROR_CODE.CONFIG_NOT_AVAILABLE);
        }
    }

    protected _getConfigPath(): string {
        return Path.join(__dirname, '..', '..', '..', 'markus.conf');
    }
}
