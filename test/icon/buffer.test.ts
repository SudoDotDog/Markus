/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Sparidae Buffer Test
 */

import { expect } from 'chai';
import Buffer from '../../src/icon/buffer';
import { IPoint } from '../../src/icon/point';

describe('test buffer parser', () => {
    const textEndPoint: IPoint = {
        x: 15,
        y: 12,
    };
    const textText: string = 'testText';
    let testContent: Buffer;

    beforeEach((): void => {
        testContent = new Buffer(textText);
    });

    it('rect will put polygon to target position', () => {
        testContent.rect(textEndPoint, textEndPoint, textEndPoint, '10');

        const result = testContent.flush();
        expect(result).to.be.equal('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" version="1.1" preserveAspectRatio="none" ><polygon points="15,12 15,12 15,12" fill="10" /></svg>');
    });

    it('rect will put polygon with aspect to target position', () => {
        testContent.rect(textEndPoint, textEndPoint, textEndPoint, '10');

        testContent.setAspect(true); // TODO
        const result = testContent.flush();
        expect(result).to.be.equal('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" version="1.1" preserveAspectRatio="none" ><polygon points="15,12 15,12 15,12" fill="10" /></svg>');
    });

    it('text will put text to target position', () => {
        testContent.text(textEndPoint, 10);

        const result = testContent.flush();
        expect(result).to.be.equal('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 480 480" version="1.1" preserveAspectRatio="none" ><text x="15" y="12" style="font-weight:bold;font-size:10;text-anchor:end">testText</text></svg>');
    });
});
