/**
 * @author WMXPY
 * @fileoverview Util Cryptos Test
 */

import { expect } from 'chai';
import { hashBuffer, hashImage, stringToMD5 } from '../../../src/util/data/crypto';
import { IMockReadStreamResult, mockReadStream } from '../../mock/mock';

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

    it('hash image should hash image with read stream', (next: () => void): void => {
        const restoreReadStream: () => IMockReadStreamResult = mockReadStream();
        const hashPromise = hashImage('some path');

        const { onFunc, triggered, onEnd } = restoreReadStream();
        onFunc('test');
        onEnd();
        expect(triggered).to.be.lengthOf(3);
        hashPromise.then((data) => {
            expect(data).to.be.equal('098f6bcd4621d373cade4e832627b4f6');
            next();
        })
    });
});
