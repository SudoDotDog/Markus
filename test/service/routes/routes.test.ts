/**
 * @author WMXPY
 * @fileoverview Service Routes tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testImageRoutes } from './image/image.test';

describe('test handlers', function (this: Mocha.Suite): void {
    let db: mongoose.Connection;

    before(function (this: Mocha.Context, next: () => void): void {
        this.timeout(3000);
        mongoose.connect(
            'mongodb://localhost:27017/markus-unit-test',
            { useNewUrlParser: true },
        );

        db = mongoose.connection;
        db.on('error', () => {
            this.skip();
        });
        db.once('open', next);
    });

    it('verify connection is working', (): void => {
        expect(mongoose.connection.readyState).to.be.equal(1);
    }).timeout(1000);

    testImageRoutes();

    after(function (this: any, next: () => void) {
        this.timeout(4300);
        if (!mongoose.connection.db) {
            this.skip();
        } else {
            mongoose.connection.db.dropDatabase((): void => {
                mongoose.connection.close(next);
            });
        }
    });
});
