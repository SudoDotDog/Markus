/**
 * @author WMXPY
 * @fileoverview Util Disaster Tolerance Test
 */

import { expect } from 'chai';
import { databaseBackup, databaseRestore } from '../../../src/util/execute/disToleran';
import { mockChildProcessExec } from '../../mock/mock';

describe('test Disaster Tolerance Class', (): void => {

    it('test databaseBackup', async (): Promise<void> => {
        const restoreExec = mockChildProcessExec();
        const result = await databaseBackup('host', 'name', 'output');

        const commandSet = restoreExec();
        expect(commandSet).to.be.lengthOf(1);
        expect(commandSet).to.be.deep.equal([
            'mongodump -h host -d name -o output',
        ]);
        expect(result).to.be.equal('succeed');
        return;
    });

    it('test databaseRestore', async (): Promise<void> => {
        const restoreExec = mockChildProcessExec();
        const result = await databaseRestore('host', 'name', './someFile');

        const commandSet = restoreExec();
        expect(commandSet).to.be.lengthOf(1);
        expect(commandSet).to.be.deep.equal([
            'mongorestore -h host -d name ./someFile',
        ]);
        expect(result).to.be.equal('succeed');
        return;
    });
});
