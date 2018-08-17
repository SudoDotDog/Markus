/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Tag Direct tests
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { ITagUserFriendly } from '../../../src/database/interface/tag';
import { ITagModel } from '../../../src/database/model/tag';
import * as Direct from '../../../src/direct/import';

export const testTagDirect = (): void => {
    describe('tag direct test', (): void => {
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

        it('get tag string name map by tag ids should return correct name', async (): Promise<void> => {
            const name: Map<string, string> = await Direct.Tag.getTagStringsNamesMapByTagIds([testTag._id]);
            // tslint:disable-next-line
            expect(name).to.be.not.null;
            expect(name.get(testTag._id.toString())).to.be.equal(testTag.name);
            return;
        }).timeout(4200);

        it('get tag string name map by tag id strings should return correct name', async (): Promise<void> => {
            const name: Map<string, string> = await Direct.Tag.getTagStringsNamesMapByTagIdStrings([testTag._id.toString()]);
            // tslint:disable-next-line
            expect(name).to.be.not.null;
            expect(name.get(testTag._id.toString())).to.be.equal(testTag.name);
            return;
        }).timeout(4200);

        it('get all tag user friendly result should return correct list', async (): Promise<void> => {
            const tags: ITagUserFriendly[] = await Direct.Tag.getAllActiveTagUserFriendlyList();
            // tslint:disable-next-line
            expect(tags).to.be.not.null;
            expect(tags.length).to.be.gte(1);
            return;
        }).timeout(4200);
    });
};
