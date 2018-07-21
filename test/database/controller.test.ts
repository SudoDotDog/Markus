/**
 * @author WMXPY
 * @fileoverview Controller tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testImageController } from './controller/image.test';

describe('test controllers', (): void => {
    let db: mongoose.Connection;

    before(function (this: any, next: () => void): void {
        this.timeout(3000);
        mongoose.connect(
            'mongodb://localhost/unit-test-1',
            // { useNewUrlParser: true },
        );

        db = mongoose.connection;
        db.on('error', () => {
            this.skip();
        });
        db.once('open', next);
    });

    it('verify connection is working', (): void => {
        // tslint:disable-next-line
        expect(mongoose.connection.readyState).to.be.equal(1);
    }).timeout(1000);

    testImageController();

    after(function (this: any, next: () => void) {
        if (!mongoose.connection.db) {
            this.skip();
        } else {
            mongoose.connection.db.dropDatabase((): void => {
                mongoose.connection.close(next);
            });
        }
    });
});
