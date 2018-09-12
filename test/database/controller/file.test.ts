/**
 * @author WMXPY
 * @fileoverview Avatar Controller tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IFileModel } from '../../../src/database/model/file';
import { compareError, error, ERROR_CODE } from '../../../src/util/error/error';
import { IFileManager } from '../../../src/util/manager/file/import';
import MockManager from '../../mock/manager';

export const testFileController = (): void => {
    describe('file controller test', (): void => {
        let testFile: IFileModel;

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.File.createFile({
                encoding: 'encoding',
                mime: 'mime',
                original: 'origin',
                size: 500,
                folder: 'test',
                filename: 'test',
                hash: 'hash',
            }).then((file: IFileModel) => {
                testFile = file;
                next();
            });
        });

        it('rummage same file should try to get same file or return null', async (): Promise<void> => {
            const file: IFileModel | null = await Controller.File.rummageSameFile('hash');
            // tslint:disable-next-line
            expect(file).to.be.not.null;
            expect((file as IFileModel)._id.toString()).to.be.equal(testFile._id.toString());
        }).timeout(3200);

        it('rummage same file should return null is the hash is new', async (): Promise<void> => {
            const file: IFileModel | null = await Controller.File.rummageSameFile('new hash');
            // tslint:disable-next-line
            expect(file).to.be.null;
        }).timeout(3200);

        it('get active file by hash should act correct behavior', async (): Promise<void> => {
            const file: IFileModel | null = await Controller.File.getActiveFileByHash('hash');
            // tslint:disable-next-line
            expect(file).to.be.not.null;
            expect((file as IFileModel)._id.toString()).to.be.equal(testFile._id.toString());
        }).timeout(3200);

        it('get active file by hash should throw correct error', async (): Promise<void> => {
            let tempError: Error;
            try {
                await Controller.File.getActiveFileByHash('new hash');
                tempError = error(ERROR_CODE.DEFAULT_TEST_ERROR);
            } catch (err) {
                tempError = err;
            }
            const result = compareError(error(ERROR_CODE.FILE_NOT_FOUND), tempError);
            // tslint:disable-next-line
            expect(result).to.be.true;
        }).timeout(3200);

        it('correct or update file by hash and manager should update file when hash is exist', async (): Promise<void> => {
            const manager: IFileManager = new MockManager('folder', 'filename', 'hash', 'mime');
            const file: IFileModel = await Controller.File.createOrUpdateAFileByHashAndManager('hash', manager, {
                mime: 'mime',
                original: 'original',
                size: 155,
                encoding: 'base64',
            });

            expect(file._id.toString()).to.be.equal(testFile._id.toString());
            expect(file.reference).to.be.equal(1);
        }).timeout(3200);

        it('correct or update file by hash and manager should create file when hash is not not exist', async (): Promise<void> => {
            const manager: IFileManager = new MockManager('folder', 'filename', 'hash', 'mime');
            const file: IFileModel = await Controller.File.createOrUpdateAFileByHashAndManager('new hash', manager, {
                mime: 'mime',
                original: 'original',
                size: 155,
                encoding: 'base64',
            });

            expect(file._id.toString()).to.be.not.equal(testFile._id.toString());
            expect(file.reference).to.be.equal(1);
        }).timeout(3200);
    });
};
