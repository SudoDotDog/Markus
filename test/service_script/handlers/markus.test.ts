/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Markus Handlers Test
 */

import { ObjectID } from 'bson';
import { expect } from 'chai';
import * as Handlers from '../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../mock/express';
import MockManager from '../../mock/manager';
import { mockUnlinkSet } from '../../mock/mock';

export const testScriptMarkusHandlers = (): void => {
    describe('markus handler test', (): void => {
        const restoreUnlink: () => string[] = mockUnlinkSet();
        let tempImageId: ObjectID;

        it('test create image by buffer handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash', 'mime');

            mock.
                request('valid', true).
                request('file', {
                    encoding: 'encoding',
                    mimetype: 'mime',
                    originalname: 'original',
                    size: 500,
                }).
                request('manager', manager).
                body('tags', ['buffer']);
            const { request, response } = mock.flush();
            await Handlers.Markus.UploadBufferHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['id', 'original']);
            return;
        }).timeout(3200);

        it('create image by buffer should return 400 when valid is false', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash', 'mime');

            mock.
                request('valid', false).
                request('file', {
                    encoding: 'encoding',
                    mimetype: 'mime',
                    originalname: 'original',
                    size: 500,
                }).
                request('manager', manager).
                body('tags', 'buffer');
            const { request, response } = mock.flush();
            await Handlers.Markus.UploadBufferHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('create image by buffer should use string tag as well', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-markus-create-buffer', 'mime');

            mock.
                request('valid', true).
                request('file', {
                    encoding: 'encoding',
                    mimetype: 'mime',
                    originalname: 'original',
                    size: 500,
                }).
                request('manager', manager).
                body('tags', 'buffer');
            const { request, response } = mock.flush();
            await Handlers.Markus.UploadBufferHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            return;
        }).timeout(3200);

        it('test create image by base64 handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-image-create-base64', 'mime');

            mock.request('valid', true)
                .request('manager', manager)
                .body('original', 'original')
                .body('image', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA-Q')
                .body('tags', ['base64']);
            const { request, response } = mock.flush();
            await Handlers.Markus.UploadBase64Handler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['id', 'original']);
            tempImageId = result.body.data.id;
            return;
        }).timeout(3200);

        it('create image should return 400 when is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-create-image', 'mime');
            mock.request('valid', false)
                .request('manager', manager)
                .body('original', 'original')
                .body('image', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABA-Q')
                .body('tags', ['base64']);
            const { request, response } = mock.flush();
            await Handlers.Markus.UploadBase64Handler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('test deactivate tag handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            mock.request('valid', true)
                .body('tag', 'buffer');
            const { request, response, nextFunction } = mock.flush();
            await Handlers.Markus.DeactivateTagHandler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['deactivated']);
            return;
        }).timeout(3200);

        it('deactivate tag handler should return 400 when is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            mock.request('valid', false)
                .body('tag', 'buffer');
            const { request, response, nextFunction } = mock.flush();
            await Handlers.Markus.DeactivateTagHandler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('test markus handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);

            const { request, response, nextFunction } = mock.flush();
            await Handlers.Markus.MarkusHandler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['agent', 'version']);
            return;
        }).timeout(3200);

        it('flush handler shall work fine with agent', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            mock.agent('test', 'test');

            const { request, response } = mock.flush();
            await Handlers.Markus.FlushHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['test']);
            return;
        }).timeout(3200);

        it('flush handler shall throw with non agent list', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const { request, response } = mock.flush();
            await Handlers.Markus.FlushHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(500);
            return;
        }).timeout(3200);

        it('restore unlink', (next: () => void): void => {
            setTimeout(() => {
                const unlinkSet: string[] = restoreUnlink();
                expect(unlinkSet.length).to.be.gte(1);
                next();
            }, 200);
            return;
        }).timeout(3200);
    });
};
