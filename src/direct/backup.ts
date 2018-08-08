/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup
 */

import Config from '../markus';
import { databaseBackup, databaseRestore } from "../util/execute/disToleran";
import { zipFolder, ICompressZipResult } from '../util/execute/compress/compress';
import { CompressMedium } from '../util/execute/compress/medium';
import { pathBuilder, fileBuilder } from '../util/data/path';
import { appropriateCurrentDateName } from '../util/data/date';
import * as Mix from '../database/mix/import';
import { IFileModel } from '../database/model/file';
import { fixConflictName } from '../util/data/file';

export const createBackupInstance = async (to: string): Promise<string> => {
    const result: string = await databaseBackup(Config.host, Config.database, to);
    return result;
};

export const restoreBackupInstance = async (from: string): Promise<string> => {
    const result: string = await databaseRestore(Config.host, Config.database, from);
    return result;
};

export const compressImagesByTag = async (tag: string): Promise<ICompressZipResult> => {
    const tempLocation: string = pathBuilder('temp');
    const medium: CompressMedium = new CompressMedium(tempLocation, appropriateCurrentDateName('tag' + tag));
    const files: IFileModel[] = await Mix.Tag.getAllFilesByTag(tag);
    const originalList: string[] = [];
    for (let file of files) {
        let original: string = file.original;
        if (originalList.includes(file.original)) {
            original = fixConflictName(original);
        }
        originalList.push(original);
        medium.addFile(fileBuilder(file.folder, file.filename), original);
    }
    const result: ICompressZipResult = await medium.finalize(files.length * 15);
    return result;
};

/* istanbul ignore next */
export const createImageBackupCompressedArchiveFile = async (): Promise<ICompressZipResult> => {
    const tempLocation: string = pathBuilder('temp');
    const result: ICompressZipResult = await zipFolder(Config.imagePath, tempLocation, appropriateCurrentDateName('ImageBackUp'));
    return result;
};
