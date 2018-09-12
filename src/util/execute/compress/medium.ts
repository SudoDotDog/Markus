/**
 * @author WMXPY
 * @description Execute Compress
 * @fileoverview Zip Medium
 */

import * as Archiver from 'archiver';
import * as Fs from 'fs';
import { mkPathDir } from '../../data/file';
import { error, ERROR_CODE } from '../../error/error';
import { fixArchivePath, ICompressZipResult } from './compress';

export class CompressMedium {
    private _archiver: Archiver.Archiver;
    private _stream: Fs.WriteStream;
    private _result: ICompressZipResult;

    public constructor(archivePath: string, archiveName: string) {
        const archiveFilePath: string = fixArchivePath(archivePath, archiveName);
        this._archiver = Archiver('zip', {
            zlib: { level: 9 },
        });
        mkPathDir(archivePath);
        this._stream = Fs.createWriteStream(archiveFilePath);
        this._result = {
            path: archiveFilePath,
            bytes: 0,
            logs: [],
        };
        this._prepare();
    }

    public addFile(path: string, name: string, modelCtime?: Date): CompressMedium {
        if (!Fs.existsSync(path)) {
            throw error(ERROR_CODE.INTERNAL_COMPRESS_TARGET_FILE_NOT_FOUND);
        }
        let ctime = modelCtime;
        if (!ctime) {
            const stat: Fs.Stats = Fs.statSync(path);
            ctime = new Date(stat.ctime);
        }

        // TODO This is for previous mistake, need to be replaced!
        if (name === 'N/A') {
            name = 'Not-Provided';
        }

        this._archiver.append(
            Fs.createReadStream(path),
            {
                name,
                date: ctime,
            },
        );
        return this;
    }

    public addBuffer(buffer: Buffer, name: string): CompressMedium {
        this._archiver.append(buffer, { name });
        return this;
    }

    public finalize(limit: number): Promise<ICompressZipResult> {
        return new Promise<ICompressZipResult>((resolve: (result: ICompressZipResult) => void, reject: (err: Error) => void) => {
            this._archiver.finalize();
            let timeout: NodeJS.Timer;
            this._stream.on('close', () => {
                clearTimeout(timeout);
                this._pointer();
                this._log('finalize');
                resolve(this._result);
            });
            timeout = setTimeout(() => {
                reject(error(ERROR_CODE.COMPRESS_TIME_OUT));
            }, limit);
        });
    }

    protected _prepare(): void {
        /* istanbul ignore next */
        this._stream.on('end', () => {
            this._pointer();
            this._log('drained');
        });

        /* istanbul ignore next */
        this._archiver.on('warning', (err: Archiver.ArchiverError) => {
            if (err.code === 'ENOENT') {
                this._log('warning:' + err.message);
            } else {
                throw err;
            }
        });

        /* istanbul ignore next */
        this._archiver.on('error', (err: Archiver.ArchiverError) => {
            throw err;
        });

        this._archiver.pipe(this._stream);
    }

    protected _log(info: string): void {
        this._result.logs.push(info);
    }

    protected _pointer(): void {
        const pointer: number = this._archiver.pointer();
        if (this._result.bytes < pointer) {
            this._result.bytes = pointer;
        }
    }
}
