/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Avatar Handlers Test
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IFileModel } from '../../../src/database/model/file';
import { IImageModel } from '../../../src/database/model/image';
import * as Handlers from '../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../mock/express';

export const testScriptImageHandlers = (): void => {
    describe('image handler test', (): void => {
        let testImage: IImageModel;
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

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Image.createImage({
                tags: [],
                file: testFile._id,
            }).then((image: IImageModel) => {
                testImage = image;
                next();
            });
        });

        it('get image by id should return image data', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.param('id', testImage.id);

            const { request, response } = mock.flush();
            await Handlers.GetImage.imageGetHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');
            return;
        }).timeout(3200);

        it('get black bg image by id should return image data', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.param('id', testImage.id);

            const { request, response } = mock.flush();
            await Handlers.GetImage.imageGetBlankBlackHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');
            return;
        }).timeout(3200);

        it('get white bg image by id should return image data', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.param('id', testImage.id);

            const { request, response } = mock.flush();
            await Handlers.GetImage.imageGetBlankWhiteHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');
            return;
        }).timeout(3200);
    });
};
