/**
 * @author WMXPY
 * @fileoverview Image Controller tests
 */
import { expect } from 'chai';
import { deactiveImageById, getImageById } from '../../../src/database/controller/image';
import { createDuplicateImage, createImage, getImageCallbackById, getImagesCallbacksByTag, getImageUserFriendlyCallbackByTag } from '../../../src/database/controller/imageMix';
import { IImageCallback } from '../../../src/database/interface/image';
import { IImageModel, ImageModel } from '../../../src/database/model/image';
import { compareError, error, ERROR_CODE } from '../../../src/util/error';
import MockManager from '../../mock/manager';
import { mockUnlinkSet } from '../../mock/mock';

export const testImageController = (): void => {
    describe('image controller test', (): void => {
        let image: IImageCallback;
        let duplicatedImage: IImageCallback;

        const refreshImage = async (): Promise<void> => {
            const temp: IImageCallback | null = await getImageCallbackById(image.id);
            if (temp) {
                image = temp;
            } else {
                throw error(ERROR_CODE.IMAGE_NOT_FOUND);
            }
            return;
        };

        it('create image should give correct image', async (): Promise<void> => {
            const mock = new MockManager('path', 'hash', 'mime');

            image = await createImage({
                encoding: 'test',
                hash: 'test',
                mime: 'test',
                original: 'test',
                manager: mock,
                size: 15,
                tags: ['a'],
            });

            expect(image.size).to.be.equal(15);
            expect(mock.getReleaseCount()).to.be.equal(0);
            expect(mock.getSaveCount()).to.be.equal(1);
            return;
        }).timeout(3200);

        it('create duplicated image with same hash should return same id and unlink same image', async (): Promise<void> => {
            const mock = new MockManager('path', 'hash', 'mime');

            const restoreUnlink: () => string[] = mockUnlinkSet();
            duplicatedImage = await createDuplicateImage({
                encoding: 'test',
                hash: 'test',
                mime: 'test',
                original: 'test',
                manager: mock,
                size: 15,
                tags: ['a'],
            });

            const result: string[] = restoreUnlink();
            expect(image.path).to.be.equal(duplicatedImage.path);
            expect(result).to.be.lengthOf(0);
            expect(mock.getReleaseCount()).to.be.equal(1);
            expect(mock.getSaveCount()).to.be.equal(0);
            return;
        }).timeout(3200);

        it('get image by id should return image callback', async (): Promise<void> => {
            const tempImage: IImageCallback = await getImageCallbackById(image.id);

            expect(tempImage.createdAt.toString()).to.be.equal(image.createdAt.toString());
            return;
        }).timeout(3200);

        it('deactive image should deactive image and return image id', async (): Promise<void> => {
            const restoreUnlink: () => string[] = mockUnlinkSet();
            await deactiveImageById(image.id);
            const imageModel: IImageModel | null = await ImageModel.findOne({ _id: image.id });

            const result: string[] = restoreUnlink();

            // tslint:disable-next-line
            expect(imageModel).to.be.not.null;
            // tslint:disable-next-line
            expect((imageModel as IImageModel).active).to.be.false;
            expect(result).to.be.lengthOf(0);
            return;
        }).timeout(3200);

        it('get image by id should return throw error when image is deactive', async (): Promise<void> => {
            let testError: Error = error(ERROR_CODE.DEFAULT_TEST_ERROR);

            try {
                await getImageById(image.id);
            } catch (err) {
                testError = err;
            } finally {
                const result = compareError(
                    testError,
                    error(ERROR_CODE.IMAGE_GET_FAILED),
                );
                // tslint:disable-next-line
                expect(result).to.be.true;
            }
            return;
        }).timeout(3200);

        it('get image by tag should return user friendly callback list', async (): Promise<void> => {
            const callbacks = await getImageUserFriendlyCallbackByTag('a');

            expect(callbacks).to.be.lengthOf(1);
            expect(callbacks[0]).to.be.keys([
                'createdAt',
                'id',
                'tags',
            ]);
            expect(callbacks[0].tags).to.be.lengthOf(1);
        }).timeout(3200);

        it('get image by tag include inactive should return all user friendly callback list', async (): Promise<void> => {
            const callbacks = await getImageUserFriendlyCallbackByTag('a', true);

            expect(callbacks).to.be.lengthOf(2);
        }).timeout(3200);

        it('get image by tag should return callback list', async (): Promise<void> => {
            const callbacks = await getImagesCallbacksByTag('a');

            expect(callbacks).to.be.lengthOf(1);
            expect(callbacks[0]).to.be.keys([
                'createdAt',
                'encoding',
                'id',
                'mime',
                'original',
                'path',
                'size',
                'tags',
            ]);
            expect(callbacks[0].tags).to.be.lengthOf(1);
        }).timeout(3200);

        it('get image by tag include inactive should return all user list', async (): Promise<void> => {
            const callbacks = await getImagesCallbacksByTag('a', true);

            expect(callbacks).to.be.lengthOf(2);
        }).timeout(3200);
    });
};
