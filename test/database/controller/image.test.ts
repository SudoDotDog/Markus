/**
 * @author WMXPY
 * @fileoverview Image Controller tests
 */
import { expect } from 'chai';
import { createDeduplicateImage, createImage, deactiveImageById, getImageById } from '../../../src/database/controller/image';
import { IImageCallback } from '../../../src/database/interface/image';
import { IImageModel, ImageModel } from '../../../src/database/model/image';
import { compareError, error, ERROR_CODE } from '../../../src/util/error';
import { mockUnlinkSet } from '../../mock/mock';

export const testImageController = (): void => {
    describe('image controller test', (): void => {
        let image: IImageModel;
        let duplicatedImage: IImageModel;

        const refreshImage = async (): Promise<void> => {
            const temp: IImageModel | null = await ImageModel.findOne({ _id: image._id });
            if (temp) {
                image = temp;
            } else {
                throw error(ERROR_CODE.IMAGE_NOT_FOUND);
            }
            return;
        };

        it('create image should give correct image', async (): Promise<void> => {
            image = await createImage({
                encoding: 'test',
                hash: 'test',
                mime: 'test',
                original: 'test',
                path: 'test',
                size: 15,
                tags: ['a'],
            });

            expect(image.size).to.be.equal(15);
            return;
        }).timeout(3200);

        it('create duplicated image with same hash should return same id and unlink same image', async (): Promise<void> => {
            const restoreUnlink: () => string[] = mockUnlinkSet();
            duplicatedImage = await createDeduplicateImage({
                encoding: 'test',
                hash: 'test',
                mime: 'test',
                original: 'test',
                path: 'test',
                size: 15,
                tags: ['a'],
            });

            const result: string[] = restoreUnlink();
            expect(image.id).to.be.equal(duplicatedImage.id);
            expect(result).to.be.lengthOf(1); // TODO
            return;
        }).timeout(3200);

        it('get image by id should return image callback', async (): Promise<void> => {
            const tempImage: IImageCallback = await getImageById(image._id);

            expect(tempImage.path).to.be.equal(image.path);
            return;
        }).timeout(3200);

        it('deactive image should deactive image and return image id', async (): Promise<void> => {
            const restoreUnlink: () => string[] = mockUnlinkSet();
            await deactiveImageById(image._id);
            await refreshImage();

            const result: string[] = restoreUnlink();
            // tslint:disable-next-line
            expect(image.active).to.be.false;
            expect(result).to.be.lengthOf(0);
            return;
        }).timeout(3200);

        it('get image by id should return throw error when image is deactive', async (): Promise<void> => {
            let testError: Error = error(ERROR_CODE.DEFAULT_TEST_ERROR);

            try {
                await getImageById(image._id);
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
    });
};
