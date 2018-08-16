/**
 * @author WMXPY
 * @fileoverview Toolbox tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { testTagDeduplicateInternalTool } from './internal_db/tag_deduplicate.test';
import { testFullBackupInternalTool } from './internal_db/full_backup.test';

describe('test internal tools', function (this: Mocha.Suite): void {
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
        // tslint:disable-next-line
        expect(mongoose.connection.readyState).to.be.equal(1);
    }).timeout(1000);

    testTagDeduplicateInternalTool();
    testFullBackupInternalTool();

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
