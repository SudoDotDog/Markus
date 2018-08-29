/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Image Direct tests
 */

import { ObjectID } from 'bson';
import { expect } from 'chai';
import * as Path from 'path';
import * as Controller from '../../../src/database/controller/import';
import { IImageCallback, IImageUserFriendlyCallback } from '../../../src/database/interface/image';
import { IImageModel } from '../../../src/database/model/image';
import { deactivateImageById } from '../../../src/direct/image';
import * as Direct from '../../../src/direct/import';
import { IFileManager } from '../../../src/util/manager/file/import';
import MockManager from '../../mock/manager';
import { mockUnlinkSet } from '../../mock/mock';

export const testImageDirect = (): void => {
    describe('image direct test', (): void => {
        let tempImageId: ObjectID;
        let anotherTempImageId: ObjectID;

        it('create image by image creation config should create correctly without same', async (): Promise<void> => {
            const manager: IFileManager = new MockManager('folder', 'filename', 'a', 'b');
            const image: IImageCallback = await Direct.Image.createImageByIImageCreationConfig({
                encoding: 'test',
                hash: 'a',
                mime: 'test',
                original: 'test',
                manager,
                size: 55,
                tags: ['test'],
            });
            expect(image).to.be.deep.equal({
                createdAt: image.createdAt,
                encoding: "test",
                id: image.id,
                mime: "test",
                original: "test",
                path: Path.join(global.MarkusConfig.imagePath, 'folder', 'filename'),
                size: 55,
                tags: image.tags,
            });
            tempImageId = image.id;
            return;
        }).timeout(4200);

        it('get image user friendly callback by tag should return correctly', async (): Promise<void> => {
            const manager: IFileManager = new MockManager('folder', 'filename', 'a', 'b');
            const anotherImage: IImageCallback = await Direct.Image.createImageByIImageCreationConfig({
                encoding: 'test',
                hash: 'b',
                mime: 'test',
                original: 'test',
                manager,
                size: 55,
                tags: ['test'],
            });
            anotherTempImageId = anotherImage.id;
            const userFriendlyCBS: IImageUserFriendlyCallback[] = await Direct.Image.getImageUserFriendlyCallbackByTag('test');
            expect(userFriendlyCBS).to.be.lengthOf(2);
            return;
        }).timeout(4200);

        it('get image call back by tag should return correct info', async (): Promise<void> => {
            const imageCBS: IImageCallback[] = await Direct.Image.getImagesCallbacksByTag('test');
            // tslint:disable-next-line
            expect(imageCBS).to.be.not.null;
            expect(imageCBS).to.be.lengthOf(2);
            return;
        }).timeout(4200);

        it('deactivate image by Id should can delete a image', async (): Promise<void> => {
            const restoreMockUnlink: () => string[] = mockUnlinkSet();
            await deactivateImageById(tempImageId);
            const image: IImageModel | null = await Controller.Image.getForceImageById(tempImageId);
            // tslint:disable-next-line
            expect(image).to.be.not.null;
            // tslint:disable-next-line
            expect((image as any).active).to.be.false;
            const result: string[] = restoreMockUnlink();
            expect(result).to.be.lengthOf(1);
            return;
        }).timeout(4200);

        it('deactivate image by string should work as same', async (): Promise<void> => {
            const restoreMockUnlink: () => string[] = mockUnlinkSet();
            await deactivateImageById(anotherTempImageId.toString());
            const image: IImageModel | null = await Controller.Image.getForceImageById(tempImageId);
            // tslint:disable-next-line
            expect(image).to.be.not.null;
            // tslint:disable-next-line
            expect((image as any).active).to.be.false;
            const result: string[] = restoreMockUnlink();
            expect(result).to.be.lengthOf(1);
            return;
        }).timeout(4200);
    });
};
