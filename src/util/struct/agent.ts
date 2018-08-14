/**
 * @author WMXPY
 * @description Structure
 * @fileoverview Agent Struct
 */

import * as Fs from 'fs';
import * as Path from 'path';
import { error, ERROR_CODE } from "../error/error";

export const markusVersion = (): Promise<string> => {
    return new Promise<string>((resolve: (version: string) => void, reject: (err: Error) => void) => {
        const versionFilePath: string = Path.resolve('package.json');
        Fs.readFile(versionFilePath, (err: Error, data: Buffer) => {
            if (err) {
                throw error(ERROR_CODE.INTERNAL_ERROR);
            }

            const json: string = data.toString();
            const packageJSON: any = JSON.parse(json);
            const version: string = packageJSON.version;
            resolve(version);
        });
    });
};
