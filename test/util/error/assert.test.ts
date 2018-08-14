/**
 * @author WMXPY
 * @fileoverview Util Error Assert Test
 */

import { expect } from 'chai';
import { assert } from '../../../src/util/error/assert';
import { error, ERROR_CODE } from '../../../src/util/error/error';

describe('test assert error util functions', (): void => {

    it('assert element exist should be fine if element is exist', (): void => {
        const result: boolean = assert(10).to.be.exist();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('assert element exist should be throw an error if element is not exist', (): void => {
        const errText: string = error(ERROR_CODE.ASSERT_EXIST_ELEMENT_NOT_EXIST).message;
        const exec: () => void = () => {
            assert(null).to.be.exist();
        };
        expect(exec).to.be.throw(errText);
    });

    it('assert element exist should be fine if element is not exist, but reversed', (): void => {
        const result: boolean = assert(null).to.be.not.exist();
        // tslint:disable-next-line
        expect(result).to.be.true;
    });
});
