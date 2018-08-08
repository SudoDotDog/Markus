/**
 * @author WMXPY
 * @description Execute
 * @fileoverview Compress Utils
 */

import { expect } from 'chai';
import * as Fs from 'fs';
import * as Path from 'path';
import { ICompressZipResult, unzipArchive, zipFolder } from '../../../../src/util/execute/compress/compress';

describe('test compress and decompress', (): void => {
    const folderPath: string = Path.resolve('./typescript');
    const archivePath: string = Path.resolve('./compress_test');
    const archiveFilePath: string = Path.join(archivePath, 'test.zip');

    it('zip folder should create a zip file with compressed files', async (): Promise<void> => {
        const result: ICompressZipResult = await zipFolder(folderPath, archivePath, 'test');
        // tslint:disable-next-line
        expect(result).to.be.not.null;
        expect(result.bytes).to.be.gte(500);
        expect(result.logs).to.be.lengthOf(0);
        expect(result.path).to.be.equal(archiveFilePath);
        return;
    });

    it('unzip folder should give a a good folder', async (): Promise<void> => {
        const result: string = await unzipArchive(archiveFilePath, archivePath);
        // tslint:disable-next-line
        expect(result).to.be.not.null;
        expect(result.length).to.be.gte(10);
        return;
    });

    after((next: () => void): void => {
        const list: string[] = Fs.readdirSync(archivePath);
        for (let i of list) {
            const targetFilePath: string = Path.join(archivePath, i);
            Fs.unlinkSync(targetFilePath);
        }
        setTimeout((): void => {
            Fs.rmdirSync(archivePath);
            next();
        }, 10);
    });
});
