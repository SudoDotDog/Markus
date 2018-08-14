/**
 * @author WMXPY
 * @fileoverview Tool environment information test
 */

import { expect } from 'chai';
import * as Controller from '../../../src/database/controller/import';
import * as Direct from '../../../src/direct/import';
import { EnvironmentInformation } from '../../../src/toolbox/import';
import { IMarkusToolResult, IMarkusTool } from '../../../src/toolbox/toolbox';

describe('test environment information internal tool', (): void => {

    it('execute tool should return displayable environment information', async (): Promise<void> => {
        const tool: IMarkusTool = new EnvironmentInformation();
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
