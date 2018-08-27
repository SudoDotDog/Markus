/**
 * @author WMXPY
 * @fileoverview Service Info Test
 */

import { expect } from 'chai';
import { logWhenSoftwareStart } from '../../../src/script/service/info';
import { mockConsoleLog } from '../../mock/mock';

describe('test log info', (): void => {
    it('all log should triggered when verbose and is debug is true', (): void => {
        const restoreConsoleLog: () => string[] = mockConsoleLog();

        logWhenSoftwareStart(true, true);

        const result: string[] = restoreConsoleLog();
        expect(result).to.be.lengthOf(3);
    });

    it('two of three log should triggered when verbose is true', (): void => {
        const restoreConsoleLog: () => string[] = mockConsoleLog();

        logWhenSoftwareStart(false, true);

        const result: string[] = restoreConsoleLog();
        expect(result).to.be.lengthOf(2);
    });

    it('one of three should triggered when debug is true', (): void => {
        const restoreConsoleLog: () => string[] = mockConsoleLog();

        logWhenSoftwareStart(true, false);

        const result: string[] = restoreConsoleLog();
        expect(result).to.be.lengthOf(1);
    });
});
