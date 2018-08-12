/**
 * @author WMXPY
 * @fileoverview Util Script Tools install
 */

import { expect } from 'chai';
import { installToolbox } from '../../../../src/script/handlers/tool/install';

describe('test install tools', (): void => {
    it('install should not return any error', (): void => {
        let installed: number = 0;
        const tools: any[] = installToolbox({
            tools: [{
                controller: (controller: any) => {
                    installed++;
                },
                direct: (direct: any) => {
                    installed++;
                },
            }],
        } as any);
        expect(tools).to.be.lengthOf(1);
        expect(installed).to.be.equal(2);
    });
});
