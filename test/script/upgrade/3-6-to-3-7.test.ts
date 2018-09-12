/**
 * @author PCXPY
 * @description Script
 * @fileoverview Upgrade 3.6 -> 3.7 File
 */

import { expect } from 'chai';
import { writeToPath } from '../../../script/upgrade/3-6-to-3-7';
import { IMockFsSyncsCB, monkFsSyncs } from '../../mock/mock';
import { getTemplate } from '../../../script/cli/conf';

describe('[SCRIPT] test 3.6 to 3.7 upgrade', (): void => {
    it('normally should update config', (): void => {
        const template: any = JSON.parse(getTemplate());
        template.authorization = {
            host: [],
            manage: [],
        };
        const newTemplate: string = JSON.stringify(template)
        const restoreSyncs: () => IMockFsSyncsCB = monkFsSyncs({
            readResult: newTemplate,
        });
        writeToPath();
        const result: IMockFsSyncsCB = restoreSyncs();
        // tslint:disable-next-line
        expect(result.read).to.be.lengthOf(1);
        expect(result.write).to.be.lengthOf(1);
    });
});
