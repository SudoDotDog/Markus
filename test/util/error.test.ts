/**
 * @author WMXPY
 * @fileoverview Util Error Test
 */

import { expect } from 'chai';
import { error, ERROR_CODE } from '../../src/util/error';

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

    it('error a unknown error code should return 900 error', (): void => {
        const result = error(999);
        expect(result.message).to.be.equal('999: Unknown error code');
    });
});
