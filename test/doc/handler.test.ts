/**
 * @author WMXPY
 * @fileoverview Doc builder test
 */

import { expect } from 'chai';
import DocRouteBuilder from '../../src/doc/builder';
import { getBuiltDocRoute } from '../../src/doc/handler';

describe('test doc handler', (): void => {

    it('test route doc builder init', (): void => {
        const builder: DocRouteBuilder = getBuiltDocRoute();
        expect(builder.length).to.be.gte(10);
    }).timeout(600);
});
