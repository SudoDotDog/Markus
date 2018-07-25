/**
 * @author WMXPY
 * @fileoverview Util Disaster Tolerance Test
 */

import { expect } from 'chai';
import { compareError, error, ERROR_CODE } from '../../../src/util/error';
import { commandBuilder, execute } from '../../../src/util/execute/disToleran';
import { mockChildProcessExec } from '../../mock/mock';

describe('test command utils', (): void => {

    it('execute should get expected stdout', async (): Promise<void> => {
        const restoreExec = mockChildProcessExec();

        const result = await execute('test');
        const commandSet = restoreExec();
        expect(commandSet).to.be.lengthOf(1);
        expect(result).to.be.equal('succeed');
        return;
    });

    it('execute with err should be reject with error', async (): Promise<void> => {
        const restoreExec = mockChildProcessExec(true);
        let resultError: Error | null = null;
        let result: string = '';
        try {
            result = await execute('test');
        } catch (err) {
            resultError = err;
        }

        const commandSet = restoreExec();
        expect(commandSet).to.be.lengthOf(1);
        expect(result).to.be.equal('');

        const compareResult = compareError(error(ERROR_CODE.DEFAULT_TEST_ERROR), (resultError as Error));
        // tslint:disable-next-line
        expect(compareResult).to.be.true;
        return;
    });

    it('execute with std error should reject with std error', async (): Promise<void> => {
        const restoreExec = mockChildProcessExec(false, true);
        let resultError: Error | null = null;
        let result: string = '';
        try {
            result = await execute('test');
        } catch (err) {
            resultError = err;
        }

        const commandSet = restoreExec();
        expect(commandSet).to.be.lengthOf(1);
        expect(result).to.be.equal('');

        expect(resultError).to.be.equal('902: Default test error');
        return;
    });
});
