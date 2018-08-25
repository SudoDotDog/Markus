/**
 * @author WMXPY
 * @description Structure
 * @fileoverview Fork Test
 */

import { expect } from 'chai';
import Fork from '../../../src/util/struct/fork';

describe('test queue data structure', (): void => {
    it('create a fork with argument should be init fork with arg', (): void => {
        const fork: Fork<number> = new Fork([1, 2, 3]);
        expect(fork).to.be.lengthOf(3);
    });

    it('create a fork without argument should be init empty fork', (): void => {
        const fork: Fork<number> = new Fork();
        expect(fork).to.be.lengthOf(0);
    });
});
