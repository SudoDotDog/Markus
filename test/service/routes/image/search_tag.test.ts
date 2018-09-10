/**
 * @author WMXPY
 * @description Route tests
 * @fileoverview Deactivate by id test
 */

import { expect } from 'chai';
import { ITagModel } from '../../../../src/database/model/tag';
import * as Route from '../../../../src/service/routes/import';
import { IMockHandlerResult, MockHandler } from '../../../mock/express';
import { createRandomTag } from '../../../mock/helper';

export const testSearchTag = (): void => {
    describe('search tag by name cut', (): void => {
        let tempTag: ITagModel;
        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4300);
            createRandomTag().then((tag: ITagModel) => {
                tempTag = tag;
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
            mock.request('valid', true)
                .body('cut', tempTag.name);
            const { request, response, nextFunction } = mock.flush();

            const compressByTagRouter = new Route.RouteSearchTag();
            await compressByTagRouter.handler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['tags']);
            expect(result.body.data.tags).to.be.lengthOf(1);
            return;
        }).timeout(3200);

        it('handler should return 400 error when is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler(true);
            mock.request('valid', false)
                .body('cut', tempTag.name);
            const { request, response, nextFunction } = mock.flush();

            const compressByTagRouter = new Route.RouteSearchTag();
            await compressByTagRouter.handler(request, response, nextFunction);

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);
    });
};
