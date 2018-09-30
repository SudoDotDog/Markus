/**
 * @author WMXPY
 * @fileoverview Util Error Test
 */

import { expect } from 'chai';
import { compareError, error, ERROR_CODE, handlerError } from '../../../src/util/error/error';
import { IMockHandlerResult, MockHandler } from '../../mock/express';

describe('test error util functions', (): void => {
    describe('error generators', (): void => {
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

    describe('error comparison and thrower', (): void => {
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

        it('handler error should throw 500 if error is internal', (): void => {
            const mock: MockHandler = new MockHandler();
            const { response } = mock.flush();
            handlerError(response, error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE));

            const result: IMockHandlerResult = mock.end();
            expect(result.status).to.be.equal(500);
        });

        it('handler error should throw 400 if error is expected', (): void => {
            const mock: MockHandler = new MockHandler();
            const { response } = mock.flush();
            handlerError(response, error(ERROR_CODE.IMAGE_GET_FAILED));

            const result: IMockHandlerResult = mock.end();
            expect(result.status).to.be.equal(400);
        });

        it('handler error should throw 500 if error is not in the list', (): void => {
            const mock: MockHandler = new MockHandler();
            const { response } = mock.flush();
            handlerError(response, new Error('some error'));

            const result: IMockHandlerResult = mock.end();
            expect(result.status).to.be.equal(500);
        });
    });
});
