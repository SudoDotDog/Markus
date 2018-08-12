/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Avatar Handlers Test
 */

import { expect } from 'chai';
import { ResponseAgent } from '../../../../src/script/handlers/util/agent';
import { IMockHandlerResult, MockHandler } from '../../../mock/express';

describe('test agent of handler', (): void => {

    it('agent should send 200 status response as normal', (): void => {
        const mock: MockHandler = new MockHandler();
        const { response } = mock.flush();
        const agent: ResponseAgent = new ResponseAgent(response);

        agent.add('test', 'test');
        agent.send();

        const result: IMockHandlerResult = mock.end();
        // tslint:disable-next-line
        expect(result).to.be.not.null;
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.keys(['status', 'data']);
        expect(result.body.data).to.be.keys(['test']);
        return;
    });
});
