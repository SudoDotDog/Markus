/**
 * @author WMXPY
 * @description Data
 * @fileoverview Dates Utils
 */

import { expect } from 'chai';
import { appropriateCurrentDateName, differenceToHour, differenceToTimeString } from '../../../src/util/data/date';

describe('test date utils', (): void => {
    it('get appropriate current date name should return a string', (): void => {
        const result: string = appropriateCurrentDateName('test');
        expect(result.length).to.be.gte(10);
        expect(result.substring(0, 4)).to.be.equal('test');
    });

    it('time to hour should work', (): void => {
        const result: number = differenceToHour(37127389);
        expect(result).to.be.equal(10);
    });

    it('time to string should return hours if millisecond is in the second range', (): void => {
        const result: string = differenceToTimeString(625);
        expect(result).to.be.equal('0.6 Sec');
    });

    it('time to string should return hours if millisecond is in the minutes range', (): void => {
        const result: string = differenceToTimeString(76100);
        expect(result).to.be.equal('1.3 Min');
    });

    it('time to string should return hours if millisecond is in the hour range', (): void => {
        const result: string = differenceToTimeString(37127389);
        expect(result).to.be.equal('10.3 Hrs');
    });

    it('time to string should return hours if millisecond is in the days range', (): void => {
        const result: string = differenceToTimeString(37122777389);
        expect(result).to.be.equal('429.7 Days');
    });
});
