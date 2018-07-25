/**
 * @author WMXPY
 * @fileoverview Util Disaster Tolerance Test
 */

import { expect } from 'chai';
import { BufferFileManager, IFileManager } from '../../../../src/util/manager/file/import';
import { mockWriteStream } from '../../../mock/mock';

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
        const restoreWriteStream: () => {
            eventList: string[];
            contentList: any[];
        } = mockWriteStream();
        await manager.save();

        const result: {
            eventList: string[];
            contentList: any[];
        } = restoreWriteStream();

        const buffer: Buffer = Buffer.from('test');
        expect(result).to.be.deep.equal({
            eventList: [
                'error',
                'finish',
            ],
            contentList: [buffer],
        });
    });
});
