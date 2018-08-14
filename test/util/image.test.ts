/**
 * @author WMXPY
 * @fileoverview Util Test
 */

import { expect } from 'chai';
import { combineTagsArray, mergeArray, unique } from '../../src/util/image';

describe('test formula image util functions', (): void => {
    it('merge array function shall return deduplicate array', (): void => {
        const original: string[] = ['hello', 'world'];
        const target: string[] = ['apple', 'world'];

        const result = mergeArray(original, target);
        expect(result).to.be.deep.equal([
            'hello',
            'world',
            'apple',
        ]);
    });

    it('combine tag function shall return deduplicate array', (): void => {
        const original: string[] = ['hello', 'world'];
        const target: string[] = ['apple', 'world'];

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

    it('test unique small string gen', (): void => {
        const result = unique(-1);
        expect(result.length).to.be.equal(8);
        expect(result.substring(0, 1)).to.be.equal('_');
    });

    it('test auto unique small string gen', (): void => {
        const result = unique();
        expect(result.length).to.be.equal(8);
        expect(result.substring(0, 1)).to.be.equal('_');
    });
});
