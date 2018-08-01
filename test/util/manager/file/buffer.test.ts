/**
 * @author WMXPY
 * @fileoverview Util Base64 manager Test
 */

import { expect } from 'chai';
import { BufferFileManager, IFileManager } from '../../../../src/util/manager/file/import';
import { IMockFsSyncsCB, mockWriteFile, monkFsSyncs } from '../../../mock/mock';

describe('test base64 file manager', (): void => {

    let manager: IFileManager;
    let releaseCounter: number;

    before((): void => {
        releaseCounter = 0;
    });

    it('constructor can init new manager', (): void => {
        const testBuffer = Buffer.from('test');
        const execute: () => void = () => {
            manager = new BufferFileManager(
                'testPath',
                'testName',
                () => {
                    releaseCounter++;
                },
                testBuffer,
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
        expect(result).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
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
        const buffer: Buffer = Buffer.from('test');
        expect(result[0].content).to.be.deep.equal(buffer);

        expect(syncs).to.be.keys(['mkdir', 'exist', 'read', 'unlink', 'write']);
        expect(syncs.mkdir).to.be.lengthOf(1);
        expect(syncs.exist).to.be.lengthOf(1);
        expect(syncs.read).to.be.lengthOf(0);
        expect(syncs.write).to.be.lengthOf(0);
        expect(syncs.unlink).to.be.lengthOf(0);
    });

    it('save second file should only check exist but not create', async (): Promise<void> => {
        const restoreSyncs = monkFsSyncs(true);
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
        const buffer: Buffer = Buffer.from('test');
        expect(result[0].content).to.be.deep.equal(buffer);

        expect(syncs).to.be.keys(['mkdir', 'exist', 'read', 'unlink', 'write']);
        expect(syncs.mkdir).to.be.lengthOf(0);
        expect(syncs.exist).to.be.lengthOf(1);
        expect(syncs.read).to.be.lengthOf(0);
        expect(syncs.write).to.be.lengthOf(0);
        expect(syncs.unlink).to.be.lengthOf(0);
    });
});
