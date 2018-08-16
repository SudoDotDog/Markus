/**
 * @author WMXPY
 * @description Data
 * @fileoverview Auth Utils
 */

import { expect } from 'chai';
import { parseBasicAuthorization } from '../../../src/util/data/auth';

describe('test auth utils', (): void => {
    it('basic authorization should return null if auth is not available', (): void => {
        const result: string | null = parseBasicAuthorization('test');
        
        expect(result).to.be.null;
    });

    it('basic authorization should return null if auth is too short or in wrong format', (): void => {
        expect(parseBasicAuthorization('test')).to.be.null;
        expect(parseBasicAuthorization('hello world test')).to.be.null;
        expect(parseBasicAuthorization(undefined as any)).to.be.null;
    });

    it('basic authorization should return null if auth is not in basic', (): void => {
        expect(parseBasicAuthorization('not something')).to.be.null;
    });

    it('basic authorization should return key if auth is in right format', (): void => {
        expect(parseBasicAuthorization('basic something')).to.be.equal('something');
    });
});
