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
import Config, { MODE } from '../../../src/markus';
import { InternalFullBackup } from '../../../src/toolbox/import';
import { IMarkusTool, IMarkusToolEstimate, IMarkusToolResult, MARKUS_TOOL_ESTIMATE_TYPE } from '../../../src/toolbox/toolbox';
import { rmRFFolderSync } from '../../../src/util/data/file';
import { mockConfig } from '../../mock/mock';

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

        it('verify full backup tool should give a boolean', (): void => {
            const tool: IMarkusTool = new InternalFullBackup();
            (tool as any).controller(Controller);
            (tool as any).direct(Direct);
            const verifyTrue: boolean = tool.verify('markus-unit-test');
            // tslint:disable-next-line
            expect(verifyTrue).to.be.true;
            const verifyFalse: boolean = tool.verify();
            // tslint:disable-next-line
            expect(verifyFalse).to.be.false;
            return;
        }).timeout(3200);

        it('estimate full backup tool should give a time', async (): Promise<void> => {
            const tool: IMarkusTool = new InternalFullBackup();
            (tool as any).controller(Controller);
            (tool as any).direct(Direct);
            const verify: boolean = tool.verify('markus-unit-test');
            // tslint:disable-next-line
            expect(verify).to.be.true;

            const estimate: IMarkusToolEstimate = await tool.estimate('markus-unit-test');
            // tslint:disable-next-line
            expect(estimate.type).to.be.equal(MARKUS_TOOL_ESTIMATE_TYPE.TIME);
            expect(estimate.time).to.be.gte(0);
            return;
        }).timeout(3200);

        it('execute full backup tool should remove duplicated tag', async (): Promise<void> => {
            const restoreConfig: () => void = mockConfig({
                host: 'mongodb://localhost:27017',
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
            expect(result).to.be.lengthOf(5);
            // tslint:disable-next-line
            expect(result[1].value).to.be.not.null;
            // tslint:disable-next-line
            expect(result[2].value).to.be.not.null;
            return;
        }).timeout(8900);

        it('test when tool is not available', async (): Promise<void> => {
            const restoreConfig: () => void = mockConfig({
                mode: MODE.AMAZON_S3,
            });

            const tool: IMarkusTool = new InternalFullBackup();
            (tool as any).controller(Controller);
            (tool as any).direct(Direct);
            const result: boolean = tool.available(Config);
            // tslint:disable-next-line
            expect(result).to.be.false;

            restoreConfig();
            return;
        }).timeout(3200);

        it('test when tool is available', async (): Promise<void> => {
            const restoreConfig: () => void = mockConfig({
                mode: MODE.FILE_SYSTEM,
            });

            const tool: IMarkusTool = new InternalFullBackup();
            (tool as any).controller(Controller);
            (tool as any).direct(Direct);
            const result: boolean = tool.available(Config);
            // tslint:disable-next-line
            expect(result).to.be.true;

            restoreConfig();
            return;
        }).timeout(3200);

        it('clean up temp file should be fine', async (): Promise<void> => {
            const tempPath: string = '../markus-temp';
            const result: string[] = rmRFFolderSync(tempPath);
            expect(result.length).to.be.gte(6);
            return;
        }).timeout(4200);
    });
};
