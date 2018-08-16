/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Sparidae Color Test
 */

import { expect } from 'chai';
import Color from '../../../src/icon/sparidae/color';

describe('test color sparidae parser', () => {
    let color: Color;

    it('factory color', () => {
        color = new Color(["#fff353", "#fec039", "#fe8c43", "#ed6023", "#e20909"]);
        // tslint:disable-next-line
        expect(color).to.be.not.null;
    });

    it('parse hex to rgba should handle unperfected input', () => {
        const next: () => string = color.rgba();
        expect(next()).to.be.equal('rgba(255, 243, 83, 0.3)');
    });

    it('parse hex to rgba should throw wrong input', () => {
        color = new Color(["#fff3537", "#fec039", "#fe8c43", "#ed6023", "#e20909"]);
        const next: () => string = color.rgba();

        expect(next.bind(next)).to.be.throw('901: Internal error, report it at github.com/sudo-dog/markus');
    });
});
