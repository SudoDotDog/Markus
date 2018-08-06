/**
 * @author WMXPY
 * @description Data
 * @fileoverview Dates Utils
 */

import { expect } from 'chai';
import { appropriateCurrentDateName } from '../../../src/util/data/date';

describe('test date utils', (): void => {
    it('get appropriate current date name should return a string', (): void => {
        const result: string = appropriateCurrentDateName('test');
        expect(result.length).to.be.gte(10);
        expect(result.substring(0,4)).to.be.equal('test');
    });
});
