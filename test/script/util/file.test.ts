/**
 * @author PCXPY
 * @description Script
 * @fileoverview Util File
 */

import { expect } from 'chai';
import { resolvePath } from '../../../script/util/file';

describe('[SCRIPT] test file utils', (): void => {
    it('get file should return correct path', (): void => {
        const result: string = resolvePath('test');
        // tslint:disable-next-line
        expect(result).to.be.not.null;
    });
});
