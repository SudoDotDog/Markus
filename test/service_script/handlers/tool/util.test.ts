/**
 * @author WMXPY
 * @fileoverview Util Script Tools Utils
 */

import { expect } from 'chai';
import { findToolAndMatchFromToolbox, findToolFromToolbox } from '../../../../src/script/handlers/tool/util';
import { IMarkusTool } from '../../../../src/toolbox/interface';
import { error, ERROR_CODE } from '../../../../src/util/error/error';
import { MockMarkusTool } from '../../../mock/tool';

describe('test util of tool finding utils', (): void => {
    it('find tool from box should give correct answer', (): void => {
        const testTool: MockMarkusTool = new MockMarkusTool('test', 'test', []);
        const result: IMarkusTool = findToolFromToolbox([testTool], 'test');
        expect(result.name).to.be.equal('test');
    });

    it('find unknown tool from box should throw', (): void => {
        const testTool: MockMarkusTool = new MockMarkusTool('test', 'test', []);
        const exec: () => void = () => {
            const result: IMarkusTool = findToolFromToolbox([testTool], 'hello');
            // tslint:disable-next-line
            expect(result).to.be.null;
        };
        expect(exec).to.be.throw(error(ERROR_CODE.TARGET_TOOL_NOT_FOUND).message);
    });

    it('find tool and match should throw if not valid', (): void => {
        const testTool: MockMarkusTool = new MockMarkusTool('test', 'test', []);
        testTool.shouldVerify = false;
        const exec: () => void = () => {
            const result: IMarkusTool = findToolAndMatchFromToolbox([testTool], 'test');
            // tslint:disable-next-line
            expect(result).to.be.null;
        };
        expect(exec).to.be.throw(error(ERROR_CODE.REQUEST_PATTERN_NOT_MATCHED).message);
    });
});
