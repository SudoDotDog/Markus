/**
 * @author WMXPY
 * @description Data
 * @fileoverview Convert Utils
 */

import { expect } from 'chai';
import { convertBytesNumberToUserFriendlyFormat } from '../../../src/util/convert/data';

describe('test convert data utils', (): void => {
    it('convert size should return normal data when with bytes', (): void => {
        const result: string = convertBytesNumberToUserFriendlyFormat(450.5);
        expect(result).to.be.equal('450b');
    });

    it('convert size should return normal data when with mbs', (): void => {
        const result: string = convertBytesNumberToUserFriendlyFormat(1657450.5);
        expect(result).to.be.equal('1mb');
    });

    it('convert size should return normal data when with larger', (): void => {
        const result: string = convertBytesNumberToUserFriendlyFormat(1631289357450.5);
        expect(result).to.be.equal('1tb');
    });

    it('convert size should return normal data when with unlimited', (): void => {
        const result: string = convertBytesNumberToUserFriendlyFormat(Infinity);
        expect(result).to.be.equal('1tb');
    });
});
