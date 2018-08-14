/**
 * @author WMXPY
 * @fileoverview Tag Controller tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { ITagModel } from '../../../src/database/model/tag';
import { compareError, error, ERROR_CODE } from '../../../src/util/error';

export const testTagController = (): void => {
    describe('test tag controller', (): void => {
        let testTag: ITagModel;

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            Controller.Tag.createTag({
                name: 'test-tag-controller',
            }).then((tag: ITagModel) => {
                testTag = tag;
                next();
            });
        });

        it('rummage tag should return a tag or null', async (): Promise<void> => {
            const tag: ITagModel | null = await Controller.Tag.rummageTag(testTag.name);
            // tslint:disable-next-line
            expect(tag).to.be.not.null;
            expect((tag as ITagModel)._id.toString()).to.be.equal(testTag._id.toString());
            return;
        }).timeout(3200);

        it('rummage tag should return a tag or null', async (): Promise<void> => {
            const tag: ITagModel | null = await Controller.Tag.rummageTag('some not exist tag');
            // tslint:disable-next-line
            expect(tag).to.be.null;
            return;
        }).timeout(3200);

        it('create tag without save could create fine', async (): Promise<void> => {
            const tag: ITagModel = Controller.Tag.createTagWithOutSave({ name: 'any' });
            // tslint:disable-next-line
            expect(tag).to.be.not.null;
            return;
        }).timeout(3200);

        it('get tag name with id should return correct result', async (): Promise<void> => {
            const tag: string = await Controller.Tag.getTagNameByTagId(testTag._id);
            // tslint:disable-next-line
            expect(tag).to.be.not.null;
            expect(tag).to.be.equal(testTag.name);
            return;
        }).timeout(3200);

        it('get tag name with id string should return correct result', async (): Promise<void> => {
            const tag: string = await Controller.Tag.getTagNameByTagIdString(testTag._id);
            // tslint:disable-next-line
            expect(tag).to.be.not.null;
            expect(tag).to.be.equal(testTag.name);
            return;
        }).timeout(3200);

        it('test risky remove tag', async (): Promise<void> => {
            await Controller.Tag.Risky_PermanentlyRemoveTag(testTag._id);
            let errorResult: boolean = false;
            try {
                await Controller.Tag.getTagByName(testTag.name);
            } catch (err) {
                errorResult = compareError(error(ERROR_CODE.TAG_NOT_FOUND), err);
            }
            // tslint:disable-next-line
            expect(errorResult).to.be.true;
            return;
        }).timeout(3200);
    });
};
