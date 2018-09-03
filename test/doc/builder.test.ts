/**
 * @author WMXPY
 * @fileoverview Doc builder test
 */

import { expect } from 'chai';
import DocRouteBuilder from '../../src/doc/builder';

describe('test doc builder', (): void => {

    it('test route doc builder init', (): void => {
        const builder: DocRouteBuilder = new DocRouteBuilder();
        expect(builder).to.be.lengthOf(0);
        expect(builder.list).to.be.lengthOf(0);
    }).timeout(600);
});
