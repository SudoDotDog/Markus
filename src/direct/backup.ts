/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup
 */

import Config from '../markus';
import { databaseBackup, databaseRestore } from "../util/execute/disToleran";

export const createBackupInstance = async (): Promise<string> => {
    const result: string = await databaseBackup(Config.host, Config.database, './');
    return result;
};

export const restoreBackupInstance = async (): Promise<string> => {
    const result: string = await databaseRestore(Config.host, Config.database);
    return result;
};
