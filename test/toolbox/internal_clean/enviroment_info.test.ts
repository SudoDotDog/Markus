/**
 * @author WMXPY
 * @fileoverview Tool environment information test
 */

import { expect } from 'chai';
import { InternalEnvironmentInformation } from '../../../src/toolbox/import';
import { IMarkusTool, IMarkusToolResult } from '../../../src/toolbox/interface';

describe('test environment information internal tool', (): void => {

    it('estimate environment information tool should give a time', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();
        const verify: boolean = tool.verify({});
        // tslint:disable-next-line
        expect(verify).to.be.true;

        const estimate: number = await tool.estimate({});
        expect(estimate).to.be.equal(0);
        return;
    }).timeout(3200);

    it('test available', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();
        const result: boolean = tool.available();
        // tslint:disable-next-line
        expect(result).to.be.true;
        return;
    }).timeout(3200);

    it('execute tool should return displayable environment information', async (): Promise<void> => {
        const tool: IMarkusTool = new InternalEnvironmentInformation();

        const verified: boolean = tool.verify({});
        // tslint:disable-next-line
        expect(verified).to.be.true;

        const result: IMarkusToolResult[] = await tool.execute({});

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
