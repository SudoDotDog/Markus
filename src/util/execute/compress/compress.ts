/**
 * @author WMXPY
 * @description Execute Compress
 * @fileoverview Zip and Unzip Compress Utils
 */

import * as Archiver from 'archiver';
import * as Fs from 'fs';
import * as Path from 'path';
import { mkPathDir } from '../../data/file';
import { commandBuilder, execute } from '../command';

export interface ICompressZipResult {
    bytes: number;
    path: string;
    logs: string[];
}

export const fixArchivePath = (folder: string, name: string) => {
    if (Path.extname(name) === '.zip') {
        return Path.join(folder, name);
    } else {
        return Path.join(folder, name + '.zip');
    }
};

export const zipFolder = (folderPath: string, archivePath: string, archiveName: string): Promise<ICompressZipResult> => {
    mkPathDir(archivePath);
    const archiveFilePath: string = fixArchivePath(archivePath, archiveName);

    return new Promise<ICompressZipResult>((resolve: (result: ICompressZipResult) => void, reject: (err: Error) => void) => {
        const outputStream: Fs.WriteStream = Fs.createWriteStream(archiveFilePath);
        const archiver: Archiver.Archiver = Archiver('zip', {
            zlib: { level: 9 },
        });
        const logs: string[] = [];
        outputStream.on('close', () => {
            resolve({
                bytes: archiver.pointer(),
                path: archiveFilePath,
                logs,
            });
        });

        /* istanbul ignore next */
        outputStream.on('end', () => {
            logs.push('drained');
        });

        /* istanbul ignore next */
        archiver.on('warning', (err: Archiver.ArchiverError) => {
            if (err.code === 'ENOENT') {
                logs.push('warning:' + err.message);
            } else {
                reject(err);
            }
        });

        /* istanbul ignore next */
        archiver.on('error', (err: Archiver.ArchiverError) => {
            reject(err);
        });

        archiver.pipe(outputStream);
        archiver.directory(folderPath, false);
        archiver.finalize();
    });
};

export const unzipArchive = async (archiveFilePath: string, targetPath: string) => {
    const command = commandBuilder([
        'unzip',
        {
            name: '-o',
            value: archiveFilePath,
        },
        {
            name: '-d',
            value: targetPath,
        },
    ]);

    const result = await execute(command);
    return result;
};
