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

    it('add element will push it to list', (): void => {
        const fork: Fork<number> = new Fork();
        fork.add(1);
        fork.add(1);
        fork.add(3);
        expect(fork).to.be.lengthOf(3);
    });

    it('has element return if has anything in it', (): void => {
        const fork: Fork<{
            name: string;
            value: number;
        }> = new Fork();
        fork.add({
            name: 'test',
            value: 1,
        });
        fork.add({
            name: 'test-2',
            value: 1,
        });

        const result: boolean = fork.has((element) => element.name === 'test');
        // tslint:disable-next-line
        expect(result).to.be.true;
        const result2: boolean = fork.has((element) => element.name === 'test-3');
        // tslint:disable-next-line
        expect(result).to.be.false;
    });
});
