/**
 * @author WMXPY
 * @fileoverview Icon test
 */

import { expect } from 'chai';
import { Icon } from '../../src/icon/icon';

describe('test icon generator', () => {

    it('test simple avatar generator', () => {
        const result: string = Icon('test');

        expect(result).to.be.equal('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" version="1.1" preserveAspectRatio="none" ><polygon points="480,139 127,480 480,138" fill="rgba(42, 77, 127, 0.3)" /><polygon points="131,0 190,480 480,212" fill="rgba(178, 201, 191, 0.3)" /><polygon points="289,0 124,480 480,455" fill="rgba(149, 105, 116, 0.3)" /><polygon points="355,119 215,537 497,192" fill="rgba(246, 172, 173, 0.3)" /><polygon points="260,50 214,537 497,350" fill="rgba(245, 213, 217, 0.3)" /><polygon points="434,119 182,537 497,313" fill="rgba(42, 77, 127, 0.3)" /><text x="455" y="425" style="font-weight:bold;font-size:200;text-anchor:end">Tt</text></svg>');
    });

    it('test avatar generator with display text', () => {
        const result: string = Icon('test', 'c');

        expect(result).to.be.equal('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" version="1.1" preserveAspectRatio="none" ><polygon points="480,139 127,480 480,138" fill="rgba(42, 77, 127, 0.3)" /><polygon points="131,0 190,480 480,212" fill="rgba(178, 201, 191, 0.3)" /><polygon points="289,0 124,480 480,455" fill="rgba(149, 105, 116, 0.3)" /><polygon points="355,119 215,537 497,192" fill="rgba(246, 172, 173, 0.3)" /><polygon points="260,50 214,537 497,350" fill="rgba(245, 213, 217, 0.3)" /><polygon points="434,119 182,537 497,313" fill="rgba(42, 77, 127, 0.3)" /><text x="455" y="425" style="font-weight:bold;font-size:200;text-anchor:end">c</text></svg>');
    });
});
