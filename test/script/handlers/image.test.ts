/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Image Handlers Test
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IFileModel } from '../../../src/database/model/file';
import { IImageModel } from '../../../src/database/model/image';
import { ITagModel } from '../../../src/database/model/tag';
import * as Handlers from '../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../mock/express';

export const testScriptImageHandlers = (): void => {
    describe('image handler test', (): void => {
        let testImage: IImageModel;
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
                hash: 'hash-image-before',
            }).then((file: IFileModel) => {
                testFile = file;
                next();
            });
        });

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Tag.createTag({
                name: 'test-for-image-handler',
            }).then((tag: ITagModel) => {
                testTag = tag;
                next();
            });
        });

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Image.createImage({
                tags: [testTag._id],
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

        it('get list by tag handler should return correct result', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock
                .body('tag', 'test-for-image-handler');

            const { request, response } = mock.flush();
            await Handlers.GetImage.imageGetListByTagHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            return;
        }).timeout(3200);

        it('404 handler should return template message', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.param('id', testImage.id);

            const { request, response } = mock.flush();
            await Handlers.GetImage.fourOFourHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(404);
            return;
        }).timeout(3200);
    });
};
