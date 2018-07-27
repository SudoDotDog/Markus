/**
 * @author WMXPY
 * @fileoverview Util Path Builders Test
 */

import { expect } from 'chai';
import * as Path from 'path';
import { fileBuilder, pathBuilder } from '../../../src/util/data/path';

describe('test path builder functions', (): void => {
    it('path builder should return builded path', (): void => {
        const result: string = pathBuilder('folder', 'test');
        const expected: string = Path.join('test', 'folder');
        expect(result).to.be.equal(expected);
    });

    it('file builder should return builded file path', (): void => {
        const result: string = fileBuilder('folder', 'file', 'test');
        const expected: string = Path.join('test', 'folder', 'file');
        expect(result).to.be.equal(expected);
    });
});
