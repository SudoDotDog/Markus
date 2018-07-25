/**
 * @author WMXPY
 * @fileoverview Util Base64 manager Test
 */

import { expect } from 'chai';
import { FileModel, IFileModel } from '../../../src/database/model/file';
import { releaseStorage, removeFile, touchDecrementAndRelease } from '../../../src/util/data/file';
import { mockUnlinkSet } from '../../mock/mock';

describe('test data file util functions', (): void => {

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
            path: 'somewhere',
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
            path: 'somewhere',
            size: 1000,
        });

        const file2: IFileModel = new FileModel({
            encoding: 'test',
            hash: 'test',
            mime: 'test',
            original: 'test',
            path: 'somewhere',
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
