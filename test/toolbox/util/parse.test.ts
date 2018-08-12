/**
 * @author WMXPY
 * @fileoverview Util Script Tools install
 */

import { expect } from 'chai';
import { getInformationByIMarkusTools } from '../../../src/toolbox/util/parse';
import { MockMarkusTool } from '../../mock/tool';

describe('test toolbox result parse utils', (): void => {

    it('get information from IMT should work correctly', (): void => {
        const testTool = new MockMarkusTool('test', 'test', []);
        const result = getInformationByIMarkusTools([testTool]);
        expect(result).to.be.lengthOf(1);
    });
});
