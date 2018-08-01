/**
 * @author WMXPY
 * @description Structure
 * @fileoverview Unique Array test
 */

import { expect } from 'chai';
import UniqueArray from '../../../src/util/struct/uniqueArray';

describe('test unique array data structure', (): void => {

    const getInitUniqueArray: () => UniqueArray<number> = (): UniqueArray<number> => {
        return new UniqueArray<number>(1, 2, 3, 4, 5, 6, 7, 8, 9);
    };

    it('initial unique array should give correct result', (): void => {
        const array0: UniqueArray<number> = new UniqueArray<number>();
        expect(array0).to.be.lengthOf(0);
        const array: UniqueArray<number> = new UniqueArray<number>(1);
        expect(array).to.be.lengthOf(1);
        expect(array.get(0)).to.be.equal(1);
        const array2: UniqueArray<number> = new UniqueArray<number>([1, 2, 3]);
        expect(array2).to.be.lengthOf(3);
        expect(array2.get(0)).to.be.equal(1);
        const array3: UniqueArray<number> = new UniqueArray<number>(1, 2, 3, 4);
        expect(array3).to.be.lengthOf(4);
        expect(array3.get(0)).to.be.equal(1);
    });

    it('set, get, length and list getter should return correct result', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        array.set(15, 1);
        expect(array.get(15)).to.be.equal(1);
        expect(array).to.be.lengthOf(16);
        expect(array.length).to.be.equal(16);
        expect(array.list).to.be.lengthOf(16);
    });

    it('push should add unique element to end of array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        array.push(10, 11, 11, 10, 12);
        expect(array).to.be.lengthOf(12);
    });

    it('unshift should add unique element to start of array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        array.unshift(10, 11, 12, 11, 11);
        expect(array).to.be.lengthOf(12);
    });

    it('concat should concat unique element to the array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const result = array.concat(getInitUniqueArray());
        expect(result).to.be.lengthOf(9);
        expect(array).to.be.lengthOf(9);
        const result2 = array.concat(getInitUniqueArray().map((value: number) => value * 10));
        expect(result2).to.be.lengthOf(18);
        expect(array).to.be.lengthOf(18);
    });

    it('first, last getter should return correct result', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        expect(array.first).to.be.equal(1);
        expect(array.last).to.be.equal(9);
    });

    it('shift should give the first value and reduce array size', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const shift: number | undefined = array.shift();
        expect(shift).to.be.equal(1);
        expect(array).to.be.lengthOf(8);
        expect(array.first).to.be.equal(2);
    });

    it('pop should give the last value and reduce array size', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const pop: number | undefined = array.pop();
        expect(pop).to.be.equal(9);
        expect(array).to.be.lengthOf(8);
        expect(array.last).to.be.equal(8);
    });

    it('map, foreach should work as same as normal array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const mapResult: number[] = array.map((value: number) => value + 1);
        expect(mapResult).to.be.deep.equal([2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const foreachResult: number[] = [];
        array.forEach((value: number) => foreachResult.push(value + 1));
        expect(foreachResult).to.be.deep.equal([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('include, indexOf should have same behavior as normal array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        expect(array.indexOf(1)).to.be.equal(0);
        expect(array.indexOf(5)).to.be.equal(4);
        expect(array.indexOf(100)).to.be.equal(-1);
        // tslint:disable-next-line
        expect(array.includes(0)).to.be.false;
        // tslint:disable-next-line
        expect(array.includes(1)).to.be.true;
    });

    it('splice should have same behavior as normal array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const spliceResult: UniqueArray<number> = array.splice(2, 1);
        expect(spliceResult.list).to.be.deep.equal([3]);
        expect(array.list).to.be.deep.equal([1, 2, 4, 5, 6, 7, 8, 9]);
    });

    it('remove should have remove target element from array', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const removeResult: number = array.remove(2);
        expect(removeResult).to.be.equal(3);
        expect(array.list).to.be.deep.equal([1, 2, 4, 5, 6, 7, 8, 9]);
    });

    it('sort should have same behavior as normal array', (): void => {
        const array: UniqueArray<number> = new UniqueArray<number>(1, 5, 3, 2, 4);
        expect(array.sort().list).to.be.deep.equal([1, 2, 3, 4, 5]);
        expect(array.list).to.be.deep.equal([1, 2, 3, 4, 5]);
    });

    it('clone give another instance is uniqueArray', (): void => {
        const array: UniqueArray<number> = new UniqueArray<number>(1, 5, 3, 2, 4);
        const cloned: UniqueArray<number> = array.clone();
        expect(array.list).to.be.not.equal(cloned.list);
        expect(array.list).to.be.equal(array.list);
        expect(array.list).to.be.deep.equal(cloned.list);
    });

    it('uniqueArray should be iterable', (): void => {
        const array: UniqueArray<number> = getInitUniqueArray();
        const temp: number[] = [];
        for (let i of array) {
            temp.push(i);
        }
        expect(array).to.be.lengthOf(9);
    });
});
