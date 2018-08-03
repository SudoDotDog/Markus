/**
 * @author WMXPY
 * @fileoverview Service Info Test
 */

import { expect } from 'chai';
import { logWhenSoftwareStart } from '../../../src/script/service/info';
import { mockConsoleLog } from '../../mock/mock';

describe('test log info', (): void => {
    it('all log should triggered when version and is debug is true', (): void => {
        const restoreConsoleLog: () => string[] = mockConsoleLog();

        logWhenSoftwareStart(true, true);

        const result: string[] = restoreConsoleLog();
        expect(result).to.be.lengthOf(3);
    });
});
