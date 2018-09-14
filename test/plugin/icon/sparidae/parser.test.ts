/**
 * @author WMXPY
 * @description Sparidae
 * @fileoverview Sparidae Parser Test
 */

import { expect } from 'chai';
import Parser from '../../../../src/plugin/icon/sparidae/parser';

describe('test icon parser', () => {
    let testContent: Parser;

    it('should return first while use single digit parser', () => {
        testContent = new Parser("Sjo");
        expect(testContent.getOneDigitResult()).to.be.equal("S");
        testContent = new Parser("sjo");
        expect(testContent.getOneDigitResult()).to.be.equal("S");
    });

    it('should return first and last while use double digit parser', () => {
        testContent = new Parser("Sjo");
        expect(testContent.getTwoDigitResult()).to.be.equal("So");
        testContent = new Parser("sjo");
        expect(testContent.getTwoDigitResult()).to.be.equal("So");
    });

    it('should return first of each name while use double digit parser to parse name', () => {
        testContent = new Parser("Joshua Liu");
        expect(testContent.getTwoDigitResult()).to.be.equal("JL");
        testContent = new Parser("T Bag");
        expect(testContent.getTwoDigitResult()).to.be.equal("TB");
        testContent = new Parser("T bag");
        expect(testContent.getTwoDigitResult()).to.be.equal("TB");
        testContent = new Parser("");
        expect(testContent.getTwoDigitResult()).to.be.equal("**");
    });

    it('should return first of first and last name while use double digit parser to parse multiple word', () => {
        testContent = new Parser("Joshua Liu T");
        expect(testContent.getTwoDigitResult()).to.be.equal("JT");
        testContent = new Parser("T Bag C");
        expect(testContent.getTwoDigitResult()).to.be.equal("TC");
        testContent = new Parser("T bag cc");
        expect(testContent.getTwoDigitResult()).to.be.equal("TC");
        testContent = new Parser("s");
        expect(testContent.getTwoDigitResult()).to.be.equal("Ss");
    });

    it('three digits testing', () => {
        testContent = new Parser("Joshua Liu T");
        expect(testContent.getThreeDigitResult()).to.be.equal("Jl T");
        testContent = new Parser("sdd");
        expect(testContent.getThreeDigitResult()).to.be.equal("Sdd");
        testContent = new Parser("T bag cc");
        expect(testContent.getThreeDigitResult()).to.be.equal("Tb C");
        testContent = new Parser("T bag");
        expect(testContent.getThreeDigitResult()).to.be.equal("TB g");
        testContent = new Parser("T ");
        expect(testContent.getThreeDigitResult()).to.be.equal("T* *");
        testContent = new Parser("T S");
        expect(testContent.getThreeDigitResult()).to.be.equal("T* *");
        testContent = new Parser("S DJS SD s");
        expect(testContent.getThreeDigitResult()).to.be.equal("Sd S");
        testContent = new Parser("a");
        expect(testContent.getThreeDigitResult()).to.be.equal("Aa*");
        testContent = new Parser("as");
        expect(testContent.getThreeDigitResult()).to.be.equal("As*");
        testContent = new Parser("");
        expect(testContent.getThreeDigitResult()).to.be.equal("***");
        testContent = new Parser("TCC QQ");
        expect(testContent.getThreeDigitResult()).to.be.equal("Tc Q");
    });
});
