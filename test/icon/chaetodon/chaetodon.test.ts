/**
 * @author WMXPY
 * @description Chaetodon
 * @fileoverview Chaetodon Test
 */

import { expect } from 'chai';
import { chaetodon, COLOR_CODE } from '../../../src/icon/chaetodon/chaetodon';

describe('test color generator', () => {
    it('should return correct chaetodon color set by color code', () => {
        const set: Array<string[5]> = chaetodon(COLOR_CODE.STAR);
        expect(set).to.be.deep.equal([
            "e42e03",
            "000000",
            "f0a202",
            "ffffff",
            "151617",
        ]);
    });

    it('should return remainder set if color code is too large', () => {
        const set: Array<string[5]> = chaetodon(85);
        const target: Array<string[5]> = chaetodon(COLOR_CODE.TWILIGHT);
        expect(set).to.be.deep.equal(target);
    });

    it('should return random color set if given nothing', () => {
        const set: Array<string[5]> = chaetodon();
        expect(set).to.be.lengthOf(5);
    });
});
