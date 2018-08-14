/**
 * @author WMXPY
 * @fileoverview Image Controller tests
 */

import { ObjectId, ObjectID } from 'bson';
import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IFileModel } from '../../../src/database/model/file';
import { IImageModel } from '../../../src/database/model/image';
import { ITagModel } from '../../../src/database/model/tag';
import { compareError, error, ERROR_CODE } from '../../../src/util/error/error';

export const testImageController = (): void => {
    describe('image controller test', (): void => {
        let tempImage: IImageModel;
        let testFile: IFileModel;
        let testTag: ITagModel;

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

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Tag.createTag({
                name: 'test',
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

        it('find image by id should can find the image just created', async (): Promise<void> => {
            const image = await Controller.Image.getImageById(tempImage._id);
            expect(image.tags).to.be.deep.equal([
                testTag._id,
            ]);
            return;
        }).timeout(3200);

        it('get image list should return list of images', async (): Promise<void> => {
            const images = await Controller.Image.getImageList();
            expect(images).to.be.deep.equal([{
                active: true,
                createdAt: tempImage.createdAt,
                id: tempImage.id,
                tags: [
                    testTag.id,
                ],
            }]);
            return;
        }).timeout(3200);

        it('get active image by tag should return image list of target tag', async (): Promise<void> => {
            const images = await Controller.Image.getActiveImagesByTag(testTag._id);
            expect(images).to.be.lengthOf(1);
            const testId: ObjectID = new ObjectId();
            let tempError: Error = error(ERROR_CODE.DEFAULT_TEST_ERROR);
            try {
                await Controller.Image.getActiveImagesByTag(testId);
            } catch (err) {
                tempError = err;
            }
            const result = compareError(error(ERROR_CODE.NO_IMAGE_UNDER_TARGET_TAG), tempError);
            // tslint:disable-next-line
            expect(result).to.be.true;
            return;
        }).timeout(3200);

        it('get active and inactive image by tag should return image list of target tag', async (): Promise<void> => {
            const images = await Controller.Image.getAllActiveAndInactiveImagesByTag(testTag._id);
            expect(images).to.be.lengthOf(1);
            const testId: ObjectID = new ObjectId();
            let tempError: Error = error(ERROR_CODE.DEFAULT_TEST_ERROR);
            try {
                await Controller.Image.getAllActiveAndInactiveImagesByTag(testId);
            } catch (err) {
                tempError = err;
            }
            const result = compareError(error(ERROR_CODE.NO_IMAGE_UNDER_TARGET_TAG), tempError);
            // tslint:disable-next-line
            expect(result).to.be.true;
            return;
        }).timeout(3200);
    });
};
