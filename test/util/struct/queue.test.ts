/**
 * @author WMXPY
 * @description Structure
 * @fileoverview Queue Test
 */

import { expect } from 'chai';
import Queue from '../../../src/util/struct/queue';

describe('test queue data structure', (): void => {
    let queue: Queue<number, number>;

    beforeEach((): void => {
        queue = new Queue<number, number>(5);
    });

    it('add same stuff to queue should not pushed', (): void => {
        queue.add(1, 1);
        queue.add(2, 2);
        queue.add(2, 2);
        expect(queue).to.be.lengthOf(2);
        expect(queue.array).to.be.deep.equal([1, 2]);
    });

    it('add new stuff will go to the end of array', (): void => {
        queue.add(1, 1);
        queue.add(2, 2);
        queue.add(1, 1);
        expect(queue.array).to.be.deep.equal([2, 1]);
    });

    it('oldest element will be removed if out of limit', (): void => {
        queue.add(1, 1);
        queue.add(2, 2);
        queue.add(3, 3);
        queue.add(4, 4);
        queue.add(5, 5);
        expect(queue.array).to.be.deep.equal([1, 2, 3, 4, 5]);
        queue.add(6, 6);
        expect(queue.array).to.be.deep.equal([2, 3, 4, 5, 6]);
    });

    it('get element will be pull it to the first', (): void => {
        queue.add(1, 1);
        queue.add(2, 2);
        queue.add(3, 3);
        queue.add(4, 4);
        queue.add(5, 5);
        expect(queue.array).to.be.deep.equal([1, 2, 3, 4, 5]);
        const result: number | null = queue.get(3);
        expect(result).to.be.equal(3);
        expect(queue.array).to.be.deep.equal([1, 2, 4, 5, 3]);
    });
});
