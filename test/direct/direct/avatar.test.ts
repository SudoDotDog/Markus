/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Avatar Tests
 */

import { expect } from 'chai';
import { IAvatarModel } from '../../../src/database/model/avatar';
import { IFileModel } from '../../../src/database/model/file';
import { rummageFileByAvatar } from '../../../src/direct/avatar';
import { createRandomAvatarWithFile } from '../../mock/mass';

export const testAvatarDirect = (): void => {
    describe('avatar direct test', (): void => {

        let avatar: IAvatarModel;

        it('rummageFileByAvatar should return null for new avatar name', async (): Promise<void> => {
            avatar = await createRandomAvatarWithFile('hello');
            const file: IFileModel | null = await rummageFileByAvatar('test');

            // tslint:disable-next-line
            expect(file).to.be.null;
            // tslint:disable-next-line
            expect(avatar).to.be.not.null;
            return;
        }).timeout(4200);

        it('rummageFileByAvatar should return file for exist avatar name', async (): Promise<void> => {
            const file: IFileModel | null = await rummageFileByAvatar('hello');

            // tslint:disable-next-line
            expect(file).to.be.not.null;
            expect((file as any).size).to.be.equal(155);
            return;
        }).timeout(3200);
    });
};
