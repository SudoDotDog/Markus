/**
 * @author WMXPY
 * @fileoverview Util Error Test
 */

import { expect } from 'chai';
import { compareError, error, ERROR_CODE } from '../../../src/util/error/error';

describe('test error util functions', (): void => {

    it('error a error code should return target error', (): void => {
        const result = error(ERROR_CODE.IMAGE_GET_LIST_FAILED);
        expect(result.message).to.be.equal('202: Image list getting failed');
    });

    it('a returned arrow should be throwable', (): void => {
        const result = error(ERROR_CODE.INTERNAL_ERROR);
        const throwThis = () => {
            throw result;
        };
        expect(throwThis).to.be.throw("901: Internal error, report it at github.com/sudo-dog/markus");
    });

    it('compare error should return TRUE if error is same', (): void => {
        const result = compareError(
            error(ERROR_CODE.IMAGE_GET_FAILED),
            error(ERROR_CODE.IMAGE_GET_FAILED),
        );
        // tslint:disable-next-line
        expect(result).to.be.true;
    });

    it('compare error should return FALSE if error is same', (): void => {
        const result = compareError(
            error(ERROR_CODE.IMAGE_GET_FAILED),
            error(ERROR_CODE.INTERNAL_ERROR),
        );
        // tslint:disable-next-line
        expect(result).to.be.false;
    });

    it('error a unknown error code should return 900 error', (): void => {
        const result = error(999);
        expect(result.message).to.be.equal('999: Unknown error code');
    });
});
