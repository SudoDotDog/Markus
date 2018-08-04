/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Auth Handlers Test
 */

import { expect } from 'chai';
import * as Handlers from '../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../mock/express';

export const testScriptAuthHandlers = (): void => {
    describe('auth handler test', (): void => {

        it('test body valid middleware', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.
                body('key', 'test');
            const { request, response, nextFunction } = mock.flush();
            await Handlers.Auth.validPermissionBodyMiddleware(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            // tslint:disable-next-line
            expect((request as any).valid).to.be.true;
            expect(result.body).to.be.equal('done');
            return;
        }).timeout(3200);

        it('test basic auth valid middleware', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();

            mock.
                header('authorization', 'Basic test');
            const { request, response, nextFunction } = mock.flush();
            await Handlers.Auth.validPermissionBasicAuthMiddleware(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            // tslint:disable-next-line
            expect((request as any).valid).to.be.true;
            expect(result.body).to.be.equal('done');
            return;
        }).timeout(3200);

        it('take a rest', (next: () => void): void => {
            setTimeout(() => {
                expect([]).to.be.lengthOf(0);
                next();
            }, 60);
            return;
        }).timeout(3200);
    });
};