/**
 * @author WMXPY
 * @description Doc Utils Test
 */

import { expect } from 'chai';
import { initMarkusGlobalConfig } from '../../../src/markus';
import { testDocUtilCode } from './code.test';
import { testDocUtilConvert } from './convert.test';

describe('test doc builder', (): void => {

    it('double check environment', () => {
        initMarkusGlobalConfig();
        // tslint:disable-next-line
        expect(global.Markus.Config).to.be.not.null;
    });

    testDocUtilCode();
    testDocUtilConvert();
});
