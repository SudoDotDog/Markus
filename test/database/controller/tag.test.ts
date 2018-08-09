/**
 * @author WMXPY
 * @fileoverview Tag Controller tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { ITagModel } from '../../../src/database/model/tag';

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
    });
};
