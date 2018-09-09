/**
 * @author WMXPY
 * @description Route tests
 * @fileoverview Compress by tag route test
 */

import { expect } from 'chai';
import { MODE } from '../../../../src/interface';
import { IExpressRoute } from '../../../../src/service/interface';
import * as Route from '../../../../src/service/routes/import';
import { mockConfig } from '../../../mock/mock';

export const testCompressByTagRoute = (): void => {
    describe('compress by tag route', (): void => {

        it('available of tag route should return true in file system mode', async (): Promise<void> => {
            const restoreMarkusConfig = mockConfig({
                mode: MODE.FILE_SYSTEM,
            });

            const compressByTagRouter: IExpressRoute = new Route.RouteCompressByTag();
            const available: boolean = await compressByTagRouter.available();

            restoreMarkusConfig();
            // tslint:disable-next-line
            expect(available).to.be.true;
            return;
        }).timeout(3200);

        it('available of tag route should return false in amazon s3 mode', async (): Promise<void> => {
            const restoreMarkusConfig = mockConfig({
                mode: MODE.AMAZON_S3,
            });

            const compressByTagRouter: IExpressRoute = new Route.RouteCompressByTag();
            const available: boolean = await compressByTagRouter.available();

            restoreMarkusConfig();
            // tslint:disable-next-line
            expect(available).to.be.false;
            return;
        }).timeout(3200);
    });
};
