/**
 * @author WMXPY
 * @fileoverview Util Path Builders Test
 */

import { expect } from 'chai';
import { fileBuilder, pathBuilder } from '../../../src/util/data/path';

describe('test path builder functions', (): void => {
    it('path builder should return builded path', (): void => {
        const result: string = pathBuilder('folder', 'test');
        expect(result).to.be.equal('test\\folder');
    });

    it('file builder should return builded file path', (): void => {
        const result: string = fileBuilder('folder', 'file', 'test');
        expect(result).to.be.equal('test\\folder\\file');
    });
});
