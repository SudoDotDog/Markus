/**
 * @author WMXPY
 * @fileoverview Image Controller tests
 */
import { expect } from 'chai';
import { createDeduplicateImage, createImage } from '../../../src/database/controller/image';
import { IImageModel } from '../../../src/database/model/image';
import { mockUnlinkSet } from '../../mock/mock';

export const testImageController = (): void => {
    describe('image controller test', (): void => {
        let image: IImageModel;
        let duplicatedImage: IImageModel;

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
        }).timeout(3200);

        it('create duplicated image with same hash should return same id and unlink same image', async (): Promise<void> => {
            const restoreCB: () => string[] = mockUnlinkSet();
            duplicatedImage = await createDeduplicateImage({
                encoding: 'test',
                hash: 'test',
                mime: 'test',
                original: 'test',
                path: 'test',
                size: 15,
                tags: ['a'],
            });
            const result: string[] = restoreCB();
            expect(image.id).to.be.equal(duplicatedImage.id);
            expect(result).to.be.lengthOf(1);
        }).timeout(3200);

        // it('create image should give correct image', async (): Promise<void> => {
        //     image = await createImage({
        //         encoding: 'test',
        //         hash: 'test',
        //         mime: 'test',
        //         original: 'test',
        //         path: 'test',
        //         size: 15,
        //         tags: ['a'],
        //     });
        //     expect(image.size).to.be.equal(15);
        // }).timeout(3200);
    });
};
