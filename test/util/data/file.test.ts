/**
 * @author WMXPY
 * @fileoverview Util Base64 manager Test
 */

import { expect } from 'chai';
import { FileModel, IFileModel } from '../../../src/database/model/file';
import { releaseStorage, removeFile, touchDecrementAndRelease, fixConflictName } from '../../../src/util/data/file';
import { mockUnlinkSet } from '../../mock/mock';

describe('test data file util functions', (): void => {

    it('fix conflict name should give a correct name with extname', async (): Promise<void> => {
        const result: string[] = fixConflictName('some.jpg').split(/_|\./);
        expect(result).to.be.lengthOf(3);
        expect(result[0]).to.be.equal('some');
        expect(result[1]).to.be.lengthOf(7);
        expect(result[2]).to.be.equal('jpg');
        return;
    });

    it('fix conflict name should give a correct name without extname', async (): Promise<void> => {
        const result: string[] = fixConflictName('some').split(/_|\./);
        expect(result).to.be.lengthOf(2);
        expect(result[0]).to.be.equal('some');
        expect(result[1]).to.be.lengthOf(7);
        return;
    });

    it('fix conflict name should give a correct name with N/A', async (): Promise<void> => {
        const result: string[] = fixConflictName('N/A').split(/_|\./);
        expect(result).to.be.lengthOf(2);
        expect(result[0]).to.be.equal('N/A');
        expect(result[1]).to.be.lengthOf(7);
        return;
    });

    it('release storage will trigger a delete', async (): Promise<void> => {
        const restoreUnlink: () => string[] = mockUnlinkSet();

        await releaseStorage('somewhere');
        const result: string[] = restoreUnlink();

        expect(result).to.be.lengthOf(1);
        return;
    });

    it('remove file will try to releaseStorage of target file', async (): Promise<void> => {
        const restoreUnlink: () => string[] = mockUnlinkSet();
        const file: IFileModel = new FileModel({
            encoding: 'test',
            hash: 'test',
            mime: 'test',
            original: 'test',
            folder: 'somewhere',
            filename: 'name',
            size: 1000,
        });
        await removeFile(file);
        const result: string[] = restoreUnlink();

        expect(result).to.be.lengthOf(1);
        return;
    });

    it('touch decrement and save file will try to remove it and save it', async (): Promise<void> => {
        const restoreUnlink: () => string[] = mockUnlinkSet();
        const file: IFileModel = new FileModel({
            encoding: 'test',
            hash: 'test',
            mime: 'test',
            original: 'test',
            folder: 'somewhere',
            filename: 'string',
            size: 1000,
        });

        const file2: IFileModel = new FileModel({
            encoding: 'test',
            hash: 'test',
            mime: 'test',
            original: 'test',
            folder: 'somewhere',
            filename: 'name',
            size: 1000,
        })
            .refIncrement()
            .refIncrement();
        await touchDecrementAndRelease(file);
        await touchDecrementAndRelease(file2);

        const result: string[] = restoreUnlink();
        expect(result).to.be.lengthOf(1);
        return;
    });
});
