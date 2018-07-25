/**
 * @author WMXPY
 * @fileoverview Util Base64 manager Test
 */

import { expect } from 'chai';
import { Base64FileManager, IFileManager } from '../../../../src/util/manager/file/import';
import { mockWriteFile } from '../../../mock/mock';

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
        expect(result).to.be.equal('2410f797db45392124023fdba6ad0a2a');
    });

    it('release function should call release func', (): void => {
        manager.release();
        expect(releaseCounter).to.be.equal(1);
    });

    it('save function should return save promise and trigger fs.save', async (): Promise<void> => {
        const restoreWriteFile: () => Array<{
            content: string;
            path: string;
        }> = mockWriteFile();
        await manager.save();

        const result: Array<{
            content: string;
            path: string;
        }> = restoreWriteFile();

        const buffer: Buffer  = Buffer.from('testBase64', 'base64');
        expect(result).to.be.deep.equal([{
            path: 'testPath',
            content: buffer,
        }]);
    });
});
