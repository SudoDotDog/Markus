/**
 * @author WMXPY
 * @fileoverview Util Cryptos Test
 */

import { expect } from 'chai';
import { hashBuffer, stringToMD5 } from '../../../src/util/data/crypto';

describe('test crypto functions', (): void => {

    it('string to md5 function should return hashed value', (): void => {
        const result: string = stringToMD5('test');
        expect(result).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
    });

    it('hash buffer function should return hashed value', (): void => {
        const buffer: Buffer = Buffer.from('test');
        const result: string = hashBuffer(buffer);
        expect(result).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
    });
});
