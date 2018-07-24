/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Sparidae Point Test
 */

import { expect } from 'chai';
import Point from '../../src/icon/point';
import { compareError, error, ERROR_CODE } from '../../src/util/error';

describe('test icon point', () => {
    let testContent: Point;

    it('get point should throw internal error if key is too small', () => {
        testContent = new Point();
        expect(testContent.getPoint.bind(testContent, 15)).to.be.throw('601: Point internal error');
    });

    it('get point should return correct point with a key', () => {
        testContent = new Point();
        expect(testContent.getPoint(6845)).to.be.deep.equal({
            x: 355,
            y: 480,
        });
        expect(testContent.getPoint(5378)).to.be.deep.equal({
            x: 0,
            y: 382,
        });
        expect(testContent.getPoint(2468)).to.be.deep.equal({
            x: 480,
            y: 68,
        });
        expect(testContent.getPoint(4587)).to.be.deep.equal({
            x: 267,
            y: 0,
        });
    });

    it('get medium point should return correct point points', () => {
        testContent = new Point();
        expect(testContent.getMediumPoint(
            {
                x: 123,
                y: 216,
            }, {
                x: 231,
                y: 105,
            },
            16)).to.be.deep.equal({
                x: 185,
                y: 168,
            });
    });

    it('get end point and font size should return static value', () => {
        testContent = new Point();
        expect(testContent.getEndPoint()).to.be.deep.equal({
            x: 455,
            y: 425,
        });
        expect(testContent.getFontSize()).to.be.deep.equal(200);
    });

    it('other function should run without throw', () => {
        testContent = new Point();
        // tslint:disable-next-line
        expect(testContent.clear()).to.be.not.throw;
        // tslint:disable-next-line
        expect(testContent.touchQueue()).to.be.not.throw;
        // tslint:disable-next-line
        expect(testContent.checkQueue(36)).to.be.not.throw;
        // tslint:disable-next-line
        expect(testContent.getRandom(16)).to.be.not.throw;
    });
});
