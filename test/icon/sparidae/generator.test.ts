/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Sparidae Generator Test
 */

import { expect } from 'chai';
import Generator from '../../../src/icon/sparidae/generator';

describe('test generator parser', () => {
    let generator: Generator;

    it('factory generator', () => {
        generator = new Generator('test');
        // tslint:disable-next-line
        expect(generator).to.be.not.null;
    });

    it('return raw', () => {
        expect(generator.raw()).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
    });
});
