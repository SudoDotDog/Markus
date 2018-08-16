/**
 * @author WMXPY
 * @fileoverview Controller tests
 */

import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { FileModel, IFileModel } from '../../src/database/model/file';
import { IImageModel, ImageModel } from '../../src/database/model/image';
import { ITagModel, TagModel } from '../../src/database/model/tag';
import { testScriptAuthHandlers } from './handlers/auth.test';
import { testScriptAvatarHandlers } from './handlers/avatar.test';
import { testScriptDebugHandlers } from './handlers/debug.test';
import { testScriptImageHandlers } from './handlers/image.test';
import { testScriptMarkusHandlers } from './handlers/markus.test';
import { testScriptToolHandlers } from './handlers/tool/tool.test';

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
        // tslint:disable-next-line
        expect(mongoose.connection.readyState).to.be.equal(1);
    }).timeout(1000);

    testScriptAuthHandlers();
    testScriptAvatarHandlers();
    testScriptMarkusHandlers();
    testScriptImageHandlers();
    testScriptToolHandlers();

    describe('before handler tests', (): void => {
        it('before debug handler test', async (): Promise<void> => {
            const tags: ITagModel[] = await TagModel.find({});
            const images: IImageModel[] = await ImageModel.find({});
            const files: IFileModel[] = await FileModel.find({});
            expect(tags.length).to.be.gte(1);
            expect(images.length).to.be.gte(1);
            expect(files.length).to.be.gte(1);

            // tslint:disable-next-line
            expect(mongoose.connection.readyState).to.be.equal(1);
            return;
        }).timeout(1500);
    });

    testScriptDebugHandlers();

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
