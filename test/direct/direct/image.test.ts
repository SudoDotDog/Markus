/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Image Direct tests
 */

import { expect } from 'chai';
import * as Path from 'path';
import { IImageCallback } from '../../../src/database/interface/image';
import * as Direct from '../../../src/direct/import';
import Config from '../../../src/markus';
import { IFileManager } from '../../../src/util/manager/file/import';
import MockManager from '../../mock/manager';

export const testImageDirect = (): void => {
    describe('image direct test', (): void => {

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
                path: Path.join(Config.imagePath, 'folder', 'filename'),
                size: 55,
                tags: image.tags,
            });
            return;
        }).timeout(4200);
    });
};
