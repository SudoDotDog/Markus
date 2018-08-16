/**
 * @author WMXPY
 * @fileoverview Util Test
 */

import { expect } from 'chai';
import { combineTagsArray, determineIsImageByExtName, mergeArray, unique } from '../../src/util/image';

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

    it('determine is image by ext name of file', (): void => {
        // tslint:disable-next-line
        expect(determineIsImageByExtName('jpg')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('.jpeg')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('gif')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('png')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('.webp')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('.gif')).to.be.true;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('.pdf')).to.be.false;
        // tslint:disable-next-line
        expect(determineIsImageByExtName('ppt')).to.be.false;
    });
});
