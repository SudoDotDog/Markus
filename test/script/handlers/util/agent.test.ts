/**
 * @author WMXPY
 * @description Script Handlers
 * @fileoverview Avatar Handlers Test
 */

import { expect } from 'chai';
import { ResponseAgent } from '../../../../src/script/handlers/util/agent';
import { IMockHandlerResult, MockHandler } from '../../../mock/express';
import { error, ERROR_CODE } from '../../../../src/util/error/error';

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

    it('agent should throw when try to add text and file', (): void => {
        const mock: MockHandler = new MockHandler();
        const { response } = mock.flush();
        const agent: ResponseAgent = new ResponseAgent(response);

        const exec: () => void = () => {
            agent.add('text', 'text');
            agent.addFile('test');
        }
        // tslint:disable-next-line
        expect(exec).to.be.throw(error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE).message)
        return;
    });

    it('agent should send file with added file', (): void => {
        const mock: MockHandler = new MockHandler();
        const { response } = mock.flush();
        const agent: ResponseAgent = new ResponseAgent(response);

        agent.addFile('test');
        agent.send();

        const result: IMockHandlerResult = mock.end();
        // tslint:disable-next-line
        expect(result).to.be.not.null;
        expect(result.status).to.be.equal(200);
        expect(result.body).to.be.equal('test');
        return;
    });

    it('agent should throw when try to add file and text', (): void => {
        const mock: MockHandler = new MockHandler();
        const { response } = mock.flush();
        const agent: ResponseAgent = new ResponseAgent(response);

        const exec: () => void = () => {
            agent.addFile('test');
            agent.add('text', 'text');
        }
        // tslint:disable-next-line
        expect(exec).to.be.throw(error(ERROR_CODE.INTERNAL_RESPONSE_AGENT_CAN_ONLY_SEND_TEXT_OR_FILE).message)
        return;
    });
});
