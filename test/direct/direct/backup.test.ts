/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Backup Tests
 */

import { expect } from 'chai';
import { createBackupInstance, restoreBackupInstance } from '../../../src/direct/backup';
import { mockChildProcessExec, mockConfig } from '../../mock/mock';

describe('backup direct test', (): void => {

    it('create backup instance should return correct result', async (): Promise<void> => {
        const restoreConfig: () => void = mockConfig({
            host: 'test',
            database: 'test',
        });
        const restoreExec = mockChildProcessExec();

        const result = await createBackupInstance('./');
        const commandSet = restoreExec();
        restoreConfig();
        expect(commandSet).to.be.lengthOf(1);
        expect(result).to.be.equal('succeed');
        return;
    });

    it('restore backup instance should return correct result', async (): Promise<void> => {
        const restoreConfig: () => void = mockConfig({
            host: 'test',
            database: 'test',
        });
        const restoreExec = mockChildProcessExec();

        const result = await restoreBackupInstance('./');
        const commandSet = restoreExec();
        restoreConfig();
        expect(commandSet).to.be.lengthOf(1);
        expect(result).to.be.equal('succeed');
        return;
    });
});
