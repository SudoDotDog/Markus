/**
 * @author WMXPY
 * @fileoverview Util Script Tools install
 */

import { expect } from 'chai';
import { IMarkusToolboxInfo } from '../../../src/toolbox/toolbox';
import { getInformationByIMarkusTools } from '../../../src/toolbox/util/parse';
import { MockMarkusTool } from '../../mock/tool';

describe('test toolbox result parse utils', (): void => {

    it('get information from IMT should work correctly', (): void => {
        const testTool: MockMarkusTool = new MockMarkusTool('test', 'test', []);
        const result: IMarkusToolboxInfo[] = getInformationByIMarkusTools([testTool]);
        expect(result).to.be.lengthOf(1);
    });
});
