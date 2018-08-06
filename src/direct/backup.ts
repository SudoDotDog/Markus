/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup
 */

import Config from '../markus';
import { databaseBackup, databaseRestore } from "../util/execute/disToleran";
import { zipFolder, ICompressZipResult } from '../util/execute/compress';
import { pathBuilder } from '../util/data/path';
import { appropriateCurrentDateName } from '../util/data/date';

export const createBackupInstance = async (to: string): Promise<string> => {
    const result: string = await databaseBackup(Config.host, Config.database, to);
    return result;
};

export const restoreBackupInstance = async (from: string): Promise<string> => {
    const result: string = await databaseRestore(Config.host, Config.database, from);
    return result;
};

/* istanbul ignore next */
export const createImageBackupCompressedArchiveFile = async (): Promise<string> => {
    const tempLocation: string = pathBuilder('temp');
    const result: ICompressZipResult = await zipFolder(Config.imagePath, tempLocation, appropriateCurrentDateName('ImageBackUp'));
    return result.path;
};
