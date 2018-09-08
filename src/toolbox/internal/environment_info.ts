/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as OS from 'os';
import { IExpressAssertionJSONType } from '../../service/interface';
import { IMarkusTool, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Environment-Information";
    public readonly nickname: string = 'Environment-Information';
    public readonly description: string = "Return Environment Information";
    public readonly require: IExpressAssertionJSONType = {};

    public available(): boolean {
        return true;
    }

    public verify(): boolean {
        return true;
    }

    public async estimate(): Promise<number> {
        return 0;
    }

    public async execute(): Promise<IMarkusToolResult[]> {
        const cpus: number = OS.cpus.length;
        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'CPUS',
            value: cpus,
        }];
    }
}
