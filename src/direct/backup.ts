/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup
 */

import * as Mix from '../database/mix/import';
import { IFileModel } from '../database/model/file';
import Log from '../plugin/log/log';
import { appropriateCurrentDateName } from '../util/data/date';
import { fixConflictName, fixExtName } from '../util/data/file';
import { fileBuilder, tempPath } from '../util/data/path';
import { ICompressZipResult, zipFolder } from '../util/execute/compress/compress';
import { CompressMedium } from '../util/execute/compress/medium';
import { databaseBackup, databaseRestore } from "../util/execute/disToleran";

export const createBackupInstance = async (to: string, database?: string): Promise<string> => {
    const result: string = await databaseBackup(global.Markus.Config.host, database || global.Markus.Config.database, to);
    return result;
};

export const restoreBackupInstance = async (from: string): Promise<string> => {
    const result: string = await databaseRestore(global.Markus.Config.host, global.Markus.Config.database, from);
    return result;
};

export const compressImagesByTag = async (tag: string, log?: Log): Promise<ICompressZipResult> => {
    const tempLocation: string = tempPath();
    const medium: CompressMedium = new CompressMedium(tempLocation, appropriateCurrentDateName('Markus-Tag-' + tag));
    const files: IFileModel[] = await Mix.Tag.getAllFilesByTag(tag);
    const originalList: string[] = [];
    if (log) {
        log.info(`compress for ${files.length} files, tag: ${tag}`);
    }

    for (let file of files) {
        let original: string = file.original;
        if (originalList.includes(file.original)) {
            original = fixConflictName(original);
        }
        originalList.push(original);
        medium.addFile(
            fileBuilder(file.folder, file.filename),
            fixExtName(original),
            file.ctime,
        );
    }
    const result: ICompressZipResult = await medium.finalize(files.length * 150);
    return result;
};

/* istanbul ignore next */
export const compressImageFromLocalStorageByTag = async (tag: string): Promise<ICompressZipResult> => {
    const tempLocation: string = tempPath();
    const medium: CompressMedium = new CompressMedium(tempLocation, appropriateCurrentDateName('Markus-Tag-' + tag));
    const files: IFileModel[] = await Mix.Tag.getAllFilesByTag(tag);
    const originalList: string[] = [];
    for (let file of files) {
        let original: string = file.original;
        if (originalList.includes(file.original)) {
            original = fixConflictName(original);
        }
        originalList.push(original);
        medium.addFile(
            fileBuilder(file.folder, file.filename),
            fixExtName(original),
            file.ctime,
        );
    }
    const result: ICompressZipResult = await medium.finalize(files.length * 150);
    return result;
};

/* istanbul ignore next */
export const compressImageFromAmazonS3ByTag = async (tag: string): Promise<ICompressZipResult> => {
    const tempLocation: string = tempPath();
    const medium: CompressMedium = new CompressMedium(tempLocation, appropriateCurrentDateName('Markus-Tag-' + tag));
    const files: IFileModel[] = await Mix.Tag.getAllFilesByTag(tag);
    const originalList: string[] = [];
    for (let file of files) {
        let original: string = file.original;
        if (originalList.includes(file.original)) {
            original = fixConflictName(original);
        }
        originalList.push(original);
        medium.addFile(
            fileBuilder(file.folder, file.filename),
            fixExtName(original),
            file.ctime,
        );
    }
    const result: ICompressZipResult = await medium.finalize(files.length * 150);
    return result;
};

/* istanbul ignore next */
export const createImageBackupCompressedArchiveFile = async (): Promise<ICompressZipResult> => {
    const tempLocation: string = tempPath();
    const result: ICompressZipResult = await zipFolder(global.Markus.Config.imagePath, tempLocation, appropriateCurrentDateName('Markus-Image-Backup'));
    return result;
};
