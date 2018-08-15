/**
 * @author WMXPY
 * @fileoverview Full Backup tests
 */

import { ObjectID } from 'bson';
import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import { IImageModel } from '../../../src/database/model/image';
import { ITagModel } from '../../../src/database/model/tag';
import * as Direct from '../../../src/direct/import';
import { InternalFullBackup } from '../../../src/toolbox/import';
import { IMarkusTool, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from '../../../src/toolbox/toolbox';
import { mockConfig } from '../../mock/mock';
import * as Fs from 'fs';
import { rmRFFolderSync } from '../../../src/util/data/file';

export const testFullBackupInternalTool = (): void => {
    describe('full backup internal tool', (): void => {
        let testDupTag: ITagModel;
        let testTag: ITagModel;

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            let count: number = 0;
            Controller.Tag.createTag({
                name: 'test-full-backup-internal-tool',
            }).then((tag: ITagModel) => {
                testTag = tag;
                if (++count === 2) {
                    next();
                }
            });

            Controller.Tag.createTag({
                name: 'test-full-backup-internal-tool',
            }).then((tag: ITagModel) => {
                testDupTag = tag;
                if (++count === 2) {
                    next();
                }
            });
        });

        before(function (this: Mocha.Context, next: () => void) {
            this.timeout(4000);
            let count: number = 0;
            Controller.Image.createImage({
                tags: [testTag._id],
                file: new ObjectID(),
            }).then((image: IImageModel) => {
                if (++count === 2) {
                    next();
                }
            });

            Controller.Image.createImage({
                tags: [testDupTag._id],
                file: new ObjectID(),
            }).then((image: IImageModel) => {
                if (++count === 2) {
                    next();
                }
            });
        });

        it('execute tool should remove duplicated tag', async (): Promise<void> => {
            const restoreConfig: () => void = mockConfig({
                host: 'mongodb://localhost',
                imagePath: './typescript',
                tempPath: '../markus-temp',
            });

            const tool: IMarkusTool = new InternalFullBackup();
            (tool as any).controller(Controller);
            (tool as any).direct(Direct);
            const verify: boolean = tool.verify('markus-unit-test');
            // tslint:disable-next-line
            expect(verify).to.be.true;

            const result: IMarkusToolResult[] = await tool.execute('markus-unit-test');
            restoreConfig();
            expect(result).to.be.lengthOf(3);
            expect(result[1].value).to.be.not.null;
            expect(result[2].value).to.be.not.null;
            return;
        }).timeout(8900);

        it('clean up temp file should be fine', async (): Promise<void> => {
            const tempPath: string = '../markus-temp';
            const result: string[] = rmRFFolderSync(tempPath);
            expect(result.length).to.be.gte(6);
            return;
        }).timeout(4200);
    });
};
