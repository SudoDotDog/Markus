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

    public resource<T>(path: string): StaticResource<T> {
        const perverse = this.readPath(path);
        const parsed: I18N<T> = JSON.parse(perverse);
        return new StaticResource<T>(parsed);
    }

    public subResource<T>(path: string, key: string): StaticResource<T> {
        const perverse = this.readPath(path);
        const parsed: {
            [key: string]: I18N<T>;
        } = JSON.parse(perverse);
        return new StaticResource<T>(parsed[key]);
    }

    protected readPath(path: string): string {
        const targetJSON: string = Path.join(this._path, path + '.json');
        const perverse: string = Fs.readFileSync(targetJSON, 'UTF8');
        return perverse;
    }
}
