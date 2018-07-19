/**
 * @author WMXPY
 * @fileoverview Util Test
 */

import { expect } from 'chai';
import { combineTagsArray } from '../../src/util/image';

describe('test image util functions', (): void => {
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
});
