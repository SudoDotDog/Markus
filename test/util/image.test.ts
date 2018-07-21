/**
 * @author WMXPY
 * @fileoverview Util Test
 */

import { expect } from 'chai';
import { combineTagsArray, unique } from '../../src/util/image';

describe('test formula image util functions', (): void => {
    it('combine tag function shall return deduplicate array', (): void => {
        const original = ['hello', 'world'];
        const target = ['apple', 'world'];

        const result = combineTagsArray(original, target);
        expect(result).to.be.deep.equal([
            'hello',
            'world',
            'apple',
        ]);
    });

    it('test unique string gen', (): void => {
        const result = unique(10);
        expect(result.length).to.be.equal(11);
        expect(result.substring(0, 1)).to.be.equal('_');
    });

    it('test uniquesmall string gen', (): void => {
        const result = unique(-1);
        expect(result.length).to.be.equal(8);
        expect(result.substring(0, 1)).to.be.equal('_');
    });

    it('test auto uniquesmall string gen', (): void => {
        const result = unique();
        expect(result.length).to.be.equal(8);
        expect(result.substring(0, 1)).to.be.equal('_');
    });
});
