/**
 * @author WMXPY
 * @description Benchmark
 * @fileoverview Controller tests
 */

import { ObjectID } from 'bson';
import { expect } from 'chai';
import * as mongoose from 'mongoose';
import * as Controller from '../../../src/database/controller/import';
import { ITagModel } from '../../../src/database/model/tag';
import { TagCacheManager } from '../../../src/util/manager/cache/tag_manager';

describe('test benchmark of tag manager', function (this: Mocha.Suite): void {
    let db: mongoose.Connection;

    before(function (this: Mocha.Context, next: () => void): void {
        this.timeout(3000);
        mongoose.connect(
            'mongodb://localhost/markus-unit-test',
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

    it('multiple running of get tagIds by names will trigger conf sometime', (next: () => void): void => {
        let result: ObjectID[] = [];
        let limit: number = 6;
        
        let count: number = 0;
        const finish = (): void => {
            expect(result).to.be.lengthOf(limit);
            next();
        };
        for (let i: number = 0; i < limit; i++) {
            Controller.Tag.getTagsIdArrayByNames(['benchmark-test-bad']).then((ids: ObjectID[]) => {
                result.push(ids[0]);
                if (++count === limit) {
                    finish();
                }
            });
        }
    }).timeout(3200);

    it('multiple running of get tagIds by names will trigger conf sometime', (next: () => void): void => {
        const tagManager: TagCacheManager = new TagCacheManager();
        const result: ObjectID[] = [];
        const limit: number = 6;

        let count: number = 0;
        const finish = (): void => {
            expect(result).to.be.lengthOf(limit);
            next();
        };
        for (let i: number = 0; i < limit; i++) {
            tagManager.rummage('benchmark-test-manager').then((tag: ITagModel) => {
                result.push(tag._id);
                if (++count === limit) {
                    finish();
                }
            });
        }
    }).timeout(3200);

    it('add many many tags', (next: () => void): void => {
        const tagManager: TagCacheManager = new TagCacheManager();
        const result: ObjectID[] = [];
        const limit: number = 70;

        let count: number = 0;
        const finish = (): void => {
            expect(result).to.be.lengthOf(limit);
            next();
        };
        for (let i: number = 0; i < limit; i++) {
            tagManager.rummage('benchmark-test-manager' + Math.floor(i / 10)).then((tag: ITagModel) => {
                result.push(tag._id);
                if (++count === limit) {
                    finish();
                }
            });
        }
    }).timeout(3200);

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
