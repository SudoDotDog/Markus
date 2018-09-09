/**
 * @author WMXPY
 * @description Route tests
 * @fileoverview Deactivate by id test
 */

import { expect } from 'chai';
import { IImageModel } from '../../../../src/database/model/image';
import * as Route from '../../../../src/service/routes/import';
import { IMockHandlerResult, MockHandler } from '../../../mock/express';
import { createRandomImage } from '../../../mock/helper';
import { mockUnlinkSet } from '../../../mock/mock';

export const testDeactivateById = (): void => {
    describe('deactivate by id route', (): void => {
        let tempImage: IImageModel;
        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4300);
            createRandomImage().then((image: IImageModel) => {
                tempImage = image;
                next();
            });
        });

        it('available of route should return true', async (): Promise<void> => {
            const compressByTagRouter = new Route.RouteDeactivateImageById();
            const available: boolean = await compressByTagRouter.available();

            // tslint:disable-next-line
            expect(available).to.be.true;
            return;
        }).timeout(3200);

        it('execute route shall run correct handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            const mockUnlink = mockUnlinkSet();
            mock.request('valid', true)
                .body('id', tempImage._id.toString());
            const { request, response, nextFunction } = mock.flush();

            const compressByTagRouter = new Route.RouteDeactivateImageById();
            await compressByTagRouter.handler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            const unlinkSet = mockUnlink();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['id']);
            return;
        }).timeout(3200);

        it('handler should return 400 error when is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            mock.request('valid', false)
                .body('id', tempImage._id.toString());
            const { request, response, nextFunction } = mock.flush();

            const compressByTagRouter = new Route.RouteDeactivateImageById();
            await compressByTagRouter.handler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);
    });
};
