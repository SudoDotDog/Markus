/**
 * @author WMXPY
 * @description Structure
 * @fileoverview Agent test
 */

import { expect } from 'chai';
import { markusVersion } from '../../../src/util/struct/agent';

describe('test agent structure and functions', (): void => {

    it('version should return correct version number', async (): Promise<void> => {
        const version: string = await markusVersion();
        expect(version).to.be.lengthOf(5);
        return;
    });
});
