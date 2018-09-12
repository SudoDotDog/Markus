/**
 * @author WMXPY
 * @description Doc Utils
 * @fileoverview Code Test
 */

import { expect } from 'chai';
import { htmlMarkusImage } from '../../../src/doc/util/code';
import { IExpressRoute } from '../../../src/service/interface';
import { IMockFsSyncsCB, monkFsSyncs } from '../../mock/mock';
import MockRoute from '../../mock/route';

export const testDocUtilCode = () => {
    describe('test code', (): void => {

        it('test html image markus', (): void => {
            const restoreSyncs: () => IMockFsSyncsCB = monkFsSyncs({
                readResult: 'hello ${path} to be good',
            });
            const route: IExpressRoute = new MockRoute();
            const htmlImage: string = htmlMarkusImage('test', route);

            const result: IMockFsSyncsCB = restoreSyncs();
            expect(htmlImage).to.be.equal('hello test to be good');
            expect(result.read).to.be.lengthOf(1);
        });
    });
};
