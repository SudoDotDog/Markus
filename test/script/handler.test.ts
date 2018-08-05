/**
 * @author WMXPY
 * @fileoverview Controller tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testScriptAuthHandlers } from './handlers/auth.test';
import { testScriptAvatarHandlers } from './handlers/avatar.test';
import { testScriptDebugHandlers } from './handlers/debug.test';
import { testScriptImageHandlers } from './handlers/image.test';
import { testScriptMarkusHandlers } from './handlers/markus.test';

describe('test handlers', function (this: Mocha.Suite): void {
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

    testScriptAuthHandlers();
    testScriptAvatarHandlers();
    testScriptMarkusHandlers();
    testScriptImageHandlers();
    testScriptDebugHandlers();

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
