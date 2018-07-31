/**
 * @author WMXPY
 * @fileoverview Controller tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testAvatarDirect } from './direct/avatar.test';
import { testImageDirect } from './direct/image.test';

describe('test directs', function (this: Mocha.Suite): void {
    let db: mongoose.Connection;

    before(function (this: Mocha.Context, next: () => void): void {
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

    testAvatarDirect();
    testImageDirect();

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
