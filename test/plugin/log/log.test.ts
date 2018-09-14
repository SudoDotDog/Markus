/**
 * @author WMXPY
 * @fileoverview Log Class Test
 */

import { expect } from 'chai';
import { LOG_MODE } from '../../../src/plugin/log/interface';
import Log from '../../../src/plugin/log/log';

describe('test log main class', (): void => {

    const createSimpleMockLogFunction = (): {
        func: (content: string) => void;
        logs: string[];
    } => {
        const logs: string[] = [];
        return {
            func: (content: string): void => {
                logs.push(content);
            },
            logs,
        };
    };

    it('create log should give a empty log agent', (): void => {
        const agent: Log = new Log(LOG_MODE.ALL);
        expect(agent.count).to.be.equal(0);
        expect(agent).to.be.lengthOf(0);
    });

    it('change log function should use new function instead', (): void => {
        const agent: Log = new Log(LOG_MODE.ALL);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test');
        expect(agent).to.be.lengthOf(1);
        expect(temps.logs).to.be.lengthOf(1);
    });

    it('in all mode, all logs should be printed', (): void => {
        const agent: Log = new Log(LOG_MODE.ALL);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test')
            .info('test')
            .warning('test');
        expect(agent).to.be.lengthOf(3);
        expect(temps.logs).to.be.lengthOf(3);
    });

    it('in debug mode, debug should be printed', (): void => {
        const agent: Log = new Log(LOG_MODE.DEBUG);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(4);
        expect(temps.logs).to.be.lengthOf(4);
    });

    it('in info mode, without debug should be printed', (): void => {
        const agent: Log = new Log(LOG_MODE.INFO);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(3);
        expect(temps.logs).to.be.lengthOf(3);
    });

    it('in warning mode, only warning and error should be printed out', (): void => {
        const agent: Log = new Log(LOG_MODE.WARNING);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test')
            .info('test')
            .warning('test')
            .debug('test');

        expect(agent).to.be.lengthOf(2);
        expect(temps.logs).to.be.lengthOf(2);
    });

    it('in error mode, only error should be printed out', (): void => {
        const agent: Log = new Log(LOG_MODE.ERROR);
        const temps: {
            func: (content: string) => void;
            logs: string[];
        } = createSimpleMockLogFunction();
        agent.func(temps.func);
        agent.error('test')
            .info('test')
            .warning('test');
        expect(agent).to.be.lengthOf(1);
        expect(temps.logs).to.be.lengthOf(1);
    });
});
