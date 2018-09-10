/**
 * @author WMXPY
 * @description Routes
 * @fileoverview Image Routes test
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testCompressByTagRoute } from './compress_by_tag.test';
import { testDeactivateById } from './deactivate_id.test';
import { testSearchTag } from './search_tag.test';

export const testImageRoutes = (): void => {
    describe('image routes test', (): void => {

        it('double check connection is working', async (): Promise<void> => {
            expect(mongoose.connection.readyState).to.be.equal(1);
            return;
        }).timeout(1500);

        testCompressByTagRoute();
        testDeactivateById();
        testSearchTag();
    });
};
