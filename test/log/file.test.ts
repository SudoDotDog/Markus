/**
 * @author WMXPY
 * @fileoverview Log File Test
 */

import { expect } from 'chai';
import FileLogAgent from '../../src/log/file';
import { LOG_MODE } from '../../src/log/interface';
import Log from '../../src/log/log';
import { mockWriteStream, monkFsSyncs } from '../mock/mock';

describe('test log file agent class', (): void => {
    it('stream should work as expected', (next: () => void): void => {
        const restoreWriteableStream = mockWriteStream();
        const restoreSync = monkFsSyncs();

        const agent: Log = new Log(LOG_MODE.ALL);
        const fileAgent: FileLogAgent = new FileLogAgent('test');
        agent.func(fileAgent.func);
        agent.info('test');

        setTimeout(() => {
            agent.info('wait 500');
        }, 100);

        setTimeout(() => {
            fileAgent.end();

            const result = restoreWriteableStream();
            expect(agent).to.be.lengthOf(2);
            expect(result.contentList).to.be.lengthOf(2);
            expect(result.eventList).to.be.lengthOf(2);

            const syncResult = restoreSync();
            expect(syncResult.exist).to.be.lengthOf(1);
            expect(syncResult.mkdir).to.be.lengthOf(1);

            next();
        }, 200);
    }).timeout(600);

    it('stream with warning and error', (next: () => void): void => {
        const restoreWriteableStream = mockWriteStream();
        const restoreSync = monkFsSyncs(true);

        const agent: Log = new Log(LOG_MODE.ALL);
        const fileAgent: FileLogAgent = new FileLogAgent('test');
        agent.func(fileAgent.func);
        agent.info('test');

        setTimeout(() => {
            agent.info('wait 500');
            agent.error('error');
        }, 100);

        setTimeout(() => {
            agent.warning('warning');
            fileAgent.end();

            const result = restoreWriteableStream();
            expect(agent).to.be.lengthOf(4);
            expect(result.contentList).to.be.lengthOf(4);
            expect(result.eventList).to.be.lengthOf(2);

            const syncResult = restoreSync();
            expect(syncResult.exist).to.be.lengthOf(1);
            expect(syncResult.mkdir).to.be.lengthOf(0);

            next();
        }, 200);
    }).timeout(600);

    it('internal log agent', (): void => {
        const restoreWriteableStream = mockWriteStream();
        const restoreSync = monkFsSyncs();

        const agent: Log = new Log(LOG_MODE.ALL);
        const fileAgent: FileLogAgent = new FileLogAgent('test');
        agent.func(fileAgent.func);
        fileAgent.approach(agent);
        agent.info('test');

        fileAgent.end();
        const result = restoreWriteableStream();
        expect(agent).to.be.lengthOf(2);
        expect(result.contentList).to.be.lengthOf(2);
        expect(result.eventList).to.be.lengthOf(2);

        const syncResult = restoreSync();
        expect(syncResult.exist).to.be.lengthOf(1);
        expect(syncResult.mkdir).to.be.lengthOf(1);
    }).timeout(600);
});
