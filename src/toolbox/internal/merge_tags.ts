/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Merge Tags
 */

import * as OS from 'os';
import { IExpressAssertionJSONType } from '../../service/interface';
import { IMarkusTool, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";

export default class InternalToolMergeTags implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Merge-Tags";
    public readonly nickname: string = 'Merge-Tags';
    public readonly description: string = "None";
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
