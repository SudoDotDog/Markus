/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Avatar Handlers Test
 */

import { expect } from 'chai';
import * as Handlers from '../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../mock/express';
import MockManager from '../../mock/manager';
import { IMockFsSyncsCB, monkFsSyncs } from '../../mock/mock';

export const testScriptAvatarHandlers = (): void => {
    describe('avatar handler test', (): void => {

        it('create a avatar with a buffer should work', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-avatar-buffer', 'mime');

            mock.request('valid', true)
                .request('file', {
                    encoding: 'encoding',
                    mimetype: 'mime',
                    originalname: 'original',
                    size: 500,
                })
                .request('manager', manager)
                .body('avatar', 'test');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarBufferHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['avatar']);
            return;
        }).timeout(3200);

        it('create a avatar with a buffer should throw if valid is false', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-avatar-buffer', 'mime');

            mock.request('valid', false)
                .request('file', {
                    encoding: 'encoding',
                    mimetype: 'mime',
                    originalname: 'original',
                    size: 500,
                })
                .request('manager', manager)
                .body('avatar', 'test');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarBufferHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('create a avatar with a base64 string should work', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-base64-avatar', 'mime');

            mock.request('valid', true)
                .request('manager', manager)
                .body('original', 'original')
                .body('image', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABC-Q')
                .body('avatar', 'testBase64');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarBase64Handler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['avatar']);
            return;
        }).timeout(3200);

        it('create a avatar with a base64 string should throw when valid is false', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const manager: MockManager = new MockManager('folder', 'filename', 'hash-base64-avatar', 'mime');

            mock.request('valid', false)
                .request('manager', manager)
                .body('original', 'original')
                .body('image', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABC-Q')
                .body('avatar', 'testBase64');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarBase64Handler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('get avatar should return a correct result', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.query('text', 'hello')
                .param('avatar', 'test');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarGetHandler(request, response);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');
            return;
        }).timeout(3200);

        it('get not exist avatar should return a autoed avatar', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const restoreMkDir: () => IMockFsSyncsCB = monkFsSyncs();

            mock.query('text', 'hello')
                .param('avatar', 'test-not-exist');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarGetHandler(request, response);

            const result: IMockHandlerResult = mock.end();

            const FsSyncsCB: IMockFsSyncsCB = restoreMkDir();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');

            expect(FsSyncsCB.exist).to.be.lengthOf(2);
            expect(FsSyncsCB.mkdir).to.be.lengthOf(2);
            expect(FsSyncsCB.write).to.be.lengthOf(1);
            return;
        }).timeout(3200);

        it('get not exist avatar should return a autoed avatar', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const restoreMkDir: () => IMockFsSyncsCB = monkFsSyncs();

            mock.param('avatar', 'test-not-exist');

            const { request, response } = mock.flush();
            await Handlers.Avatar.avatarGetHandler(request, response);

            const result: IMockHandlerResult = mock.end();

            const FsSyncsCB: IMockFsSyncsCB = restoreMkDir();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(typeof result.body).to.be.equal('string');

            expect(FsSyncsCB.exist).to.be.lengthOf(2);
            expect(FsSyncsCB.mkdir).to.be.lengthOf(2);
            expect(FsSyncsCB.write).to.be.lengthOf(1);
            return;
        }).timeout(3200);
    });
};
