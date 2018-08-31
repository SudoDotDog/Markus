/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Auth Handlers Test
 */

import { expect } from 'chai';
import * as Path from 'path';
import * as Handlers from '../../../../src/script/handlers/import';
import { IMockHandlerResult, MockHandler } from '../../../mock/express';
import { mockConfig, mockExtensionConfig } from '../../../mock/mock';
import { MockMarkusTool } from '../../../mock/tool';

export const testScriptToolHandlers = (): void => {
    describe('tool handler test', (): void => {

        it('test estimate handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const mockTool = new MockMarkusTool('test', 'description', []);
            const restoreConfig: () => void = mockExtensionConfig({
                tools: [mockTool],
            });
            const restoreGlobalConfig: () => void = mockConfig({
                tempPath: Path.resolve('./temp'),
            });
            Handlers.Tool.rebuildTools();

            mock.body('name', 'test')
                .body('args', []);
            const { request, response } = mock.flush();
            await Handlers.Tool.markusToolboxEstimateHandler(request, response);

            restoreConfig();
            restoreGlobalConfig();
            Handlers.Tool.rebuildTools();

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['time', 'type', 'teapots']);
            return;
        }).timeout(3200);

        it('estimate handler should return 400 if input is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const mockTool = new MockMarkusTool('test', 'description', []);
            const restoreConfig: () => void = mockExtensionConfig({
                tools: [mockTool],
            });
            const restoreGlobalConfig: () => void = mockConfig({
                tempPath: Path.resolve('./temp'),
            });
            Handlers.Tool.rebuildTools();

            mock.body('name', 'test');
            const { request, response } = mock.flush();
            await Handlers.Tool.markusToolboxEstimateHandler(request, response);

            restoreConfig();
            restoreGlobalConfig();
            Handlers.Tool.rebuildTools();

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('test execute handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const mockTool = new MockMarkusTool('test', 'description', []);
            const restoreConfig: () => void = mockExtensionConfig({
                tools: [mockTool],
            });
            const restoreGlobalConfig: () => void = mockConfig({
                tempPath: Path.resolve('./temp'),
            });
            Handlers.Tool.rebuildTools();

            mock.body('name', 'test')
                .body('args', []);
            const { request, response } = mock.flush();
            await Handlers.Tool.markusToolboxExecuteHandler(request, response);

            restoreConfig();
            restoreGlobalConfig();
            Handlers.Tool.rebuildTools();

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['result', 'teapots']);
            return;
        }).timeout(3200);

        it('execute handler should return 400 if input is not valid', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const mockTool = new MockMarkusTool('test', 'description', []);
            const restoreConfig: () => void = mockExtensionConfig({
                tools: [mockTool],
            });
            const restoreGlobalConfig: () => void = mockConfig({
                tempPath: Path.resolve('./temp'),
            });
            Handlers.Tool.rebuildTools();

            mock.body('name', 'test');
            const { request, response } = mock.flush();
            await Handlers.Tool.markusToolboxExecuteHandler(request, response);

            restoreConfig();
            restoreGlobalConfig();
            Handlers.Tool.rebuildTools();

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(400);
            return;
        }).timeout(3200);

        it('test list handler', async (): Promise<void> => {
            const mock: MockHandler = new MockHandler();
            const mockTool = new MockMarkusTool('test', 'description', []);
            const restoreConfig: () => void = mockExtensionConfig({
                tools: [mockTool],
            });
            const restoreGlobalConfig: () => void = mockConfig({
                tempPath: Path.resolve('./temp'),
            });
            Handlers.Tool.rebuildTools();

            const { request, response } = mock.flush();
            await Handlers.Tool.markusToolboxListHandler(request, response);

            restoreConfig();
            restoreGlobalConfig();
            Handlers.Tool.rebuildTools();

            const result: IMockHandlerResult = mock.end();
            // tslint:disable-next-line
            expect(result).to.be.not.null;
            expect(result.status).to.be.equal(200);
            expect(result.body).to.be.keys(['status', 'data']);
            expect(result.body.data).to.be.keys(['tools']);
            expect(result.body.data.tools).to.be.lengthOf(1);
            return;
        }).timeout(3200);
    });
};
