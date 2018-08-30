/**
 * @author WMXPY
 * @fileoverview Util Base64 manager Test
 */

import { expect } from 'chai';
import { Base64FileManager, IFileManager } from '../../../../src/util/manager/file/import';
import { IMockFsSyncsCB, mockWriteFile, monkFsSyncs } from '../../../mock/mock';

describe('test base64 file manager', (): void => {
    let manager: IFileManager;
    let releaseCounter: number;

    before((): void => {
        releaseCounter = 0;
    });

    it('constructor can init new manager', (): void => {
        const execute: () => void = () => {
            manager = new Base64FileManager(
                'testPath',
                'testName',
                () => {
                    releaseCounter++;
                },
                'testBase64',
                'testMime',
            );
        };

        expect(execute).to.be.not.throw();
    });

    it('mime function should return mime of class', (): void => {
        expect(manager.mime()).to.be.equal('testMime');
    });

    it('hash function should return hash of base64', async (): Promise<void> => {
        const result = await manager.hash();

        expect(result).to.be.equal('9b9d6fc057dd7324787c8f1fd4dcbd2f');
    });

    it('release function should call release func', (): void => {
        manager.release();

        expect(releaseCounter).to.be.equal(1);
    });

    it('save function should return save promise and trigger fs.save', async (): Promise<void> => {
        const restoreSyncs = monkFsSyncs();
        const restoreWriteFile: () => Array<{
            content: string;
            path: string;
        }> = mockWriteFile();
        await manager.save();

        const result: Array<{
            content: string;
            path: string;
        }> = restoreWriteFile();
        const syncs: IMockFsSyncsCB = restoreSyncs();
        const buffer: Buffer = Buffer.from('testBase64', 'base64');
        expect(result[0].content).to.be.deep.equal(buffer);
        // tslint:disable-next-line
        expect(syncs).to.be.not.null;
    });
});
