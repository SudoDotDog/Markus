/**
 * @author WMXPY
 * @description Markus Plugin
 * @fileoverview i18n
 */

import { I18N } from '#i18n/interface';
import StaticResource from '#i18n/static';
import * as Fs from 'fs';
import * as Path from 'path';

export default class Internationalization {
    private _path: string;

    public constructor(path: string) {
        this._path = path;
    }

    public resource<T>(name: string): StaticResource<T> {
        const targetJSON: string = Path.join(this._path, name + '.json');
        const perverse: string = Fs.readFileSync(targetJSON, 'UTF8');
        const parsed: I18N<T> = JSON.parse(perverse);
        return new StaticResource<T>(parsed);
    }
}
