/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup Async Tests
 */

import { expect } from 'chai';
import * as Path from 'path';
import * as Controller from '../../../src/database/controller/import';
import { IFileModel } from '../../../src/database/model/file';
import { IImageModel } from '../../../src/database/model/image';
import { ITagModel } from '../../../src/database/model/tag';
import { compressImagesByTag } from '../../../src/direct/backup';
import { mockConfig } from '../../mock/mock';

export const testBackupDirect = (): void => {
    describe('backup direct test', (): void => {
        let tempImage: IImageModel;
        let testFile: IFileModel;
        let testTag: ITagModel;

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.File.createFile({
                encoding: 'encoding',
                mime: 'mime',
                original: 'test.ts',
                size: 500,
                folder: 'src',
                filename: 'markus.ts',
                hash: 'hash-backup',
            }).then((file: IFileModel) => {
                testFile = file;
                next();
            });
        });

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Tag.createTag({
                name: 'test-backup',
            }).then((tag: ITagModel) => {
                testTag = tag;
                next();
            });
        });

        it('create image should give correct image', async (): Promise<void> => {
            const image = await Controller.Image.createImage({
                file: testFile._id,
                tags: [testTag._id],
            });
            expect(image.tags).to.be.deep.equal([
                testTag._id,
            ]);
            tempImage = image;
            return;
        }).timeout(3200);

        it('compress image by tag should give correct information', async (): Promise<void> => {
            const restoreConfig = mockConfig({
                imagePath: Path.resolve('./'),
            });
            const result = await compressImagesByTag(testTag.name);
            restoreConfig();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.bytes).to.be.gte(300);
            expect(result.logs).to.be.lengthOf(0);
            // tslint:disable-next-line
            expect(result.path).to.be.not.undefined;
            return;
        });
    });
};
