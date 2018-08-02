/**
 * @author WMXPY
 * @fileoverview Avatar Controller tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IAvatarModel } from '../../../src/database/model/avatar';
import { IFileModel } from '../../../src/database/model/file';

export const testAvatarController = (): void => {
    describe('avatar controller test', (): void => {
        let testFile: IFileModel;
        let tempAvatar: IAvatarModel;

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

        it('create avatar should put a avatar record to database', async (): Promise<void> => {
            const avatar: IAvatarModel = await Controller.Avatar.createAvatar({
                avatar: 'test',
                file: testFile._id,
            });
            expect(avatar.active).to.be.true;
            tempAvatar = avatar;
            return;
        }).timeout(3200);

        it('create or update avatar with new avatar name should put a avatar record to database', async (): Promise<void> => {
            const avatar: IAvatarModel = await Controller.Avatar.createOrUpdateAvatarAndSave({
                avatar: 'another',
                file: testFile._id,
            });
            expect(avatar.active).to.be.true;
            expect(avatar._id.toString()).to.be.not.equal(tempAvatar._id.toString());
            return;
        }).timeout(3200);

        it('create or update avatar with same name should just update its file', async (): Promise<void> => {
            const anotherFile: IFileModel = await Controller.File.createFile({
                encoding: 'encoding',
                mime: 'mime',
                original: 'origin',
                size: 500,
                folder: 'test',
                filename: 'test',
                hash: 'hash',
            });

            expect(tempAvatar.file.toString()).to.be.equal(testFile._id.toString());
            expect(tempAvatar.file.toString()).to.be.not.equal(anotherFile._id.toString());
            
            const newAvatar: IAvatarModel = await Controller.Avatar.createOrUpdateAvatarAndSave({
                avatar: 'test',
                file: anotherFile._id,
            });

            expect(tempAvatar._id.toString()).to.be.equal(newAvatar._id.toString());
            expect(newAvatar.file.toString()).to.be.not.equal(testFile._id.toString());
            expect(newAvatar.file.toString()).to.be.equal(anotherFile._id.toString());
            return;
        }).timeout(3200);

        it('get avatar by name should return correct storage', async (): Promise<void> => {
            const avatar: IAvatarModel = await Controller.Avatar.getAvatarByName('test');
            expect(avatar.active).to.be.true;
            expect(avatar._id.toString()).to.be.equal(tempAvatar._id.toString());
            return;
        }).timeout(3200);
    });
};
