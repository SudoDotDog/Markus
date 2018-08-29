/**
 * @author WMXPY
 * @fileoverview Tool environment information test
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import * as Direct from '../../../src/direct/import';
import { InternalEnvironmentInformation } from '../../../src/toolbox/import';
import { IMarkusTool, IMarkusToolEstimate, IMarkusToolResult, MARKUS_TOOL_ESTIMATE_TYPE } from '../../../src/toolbox/toolbox';

describe('test environment information internal tool', (): void => {

    it('estimate environment information tool should give a time', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();
        (tool as any).controller(Controller);
        (tool as any).direct(Direct);
        const verify: boolean = tool.verify();
        // tslint:disable-next-line
        expect(verify).to.be.true;

        const estimate: IMarkusToolEstimate = await tool.estimate();
        // tslint:disable-next-line
        expect(estimate.type).to.be.equal(MARKUS_TOOL_ESTIMATE_TYPE.IMMEDIATE);
        expect(estimate.time).to.be.equal(0);
        return;
    }).timeout(3200);

    it('test available', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();
        (tool as any).controller(Controller);
        (tool as any).direct(Direct);
        const result: boolean = tool.available(global.MarkusConfig);
        // tslint:disable-next-line
        expect(result).to.be.true;
        return;
    }).timeout(3200);

    it('execute tool should return displayable environment information', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();
        (tool as any).controller(Controller);
        (tool as any).direct(Direct);

        const verified: boolean = tool.verify();
        // tslint:disable-next-line
        expect(verified).to.be.true;

        const result: IMarkusToolResult[] = await tool.execute();

        expect(result).to.be.deep.equal([
            {
                name: 'CPUS',
                type: 'STRING',
                value: 0,
            },
        ]);
        return;
    }).timeout(3200);
});
