/**
 * @author WMXPY
 * @description Mock
 * @fileoverview Mock Markus Tool
 */

import { IExpressAssertionJSONType } from "../../src/service/interface";
import { IMarkusTool, IMarkusToolResult } from "../../src/toolbox/interface";

export class MockMarkusTool implements IMarkusTool {
    public readonly name: string;
    public readonly nickname: string;
    public readonly description: string;
    public readonly require: IExpressAssertionJSONType;

    public shouldVerify: boolean = false;

    public constructor(
        name: string,
        description: string = 'mock markus tool',
        require: IExpressAssertionJSONType = {},
    ) {
        this.name = name;
        this.nickname = name;
        this.description = description;
        this.require = require;

        this.shouldVerify = true;
    }

    public available() {
        return true;
    }

    public verify(): boolean {
        return this.shouldVerify;
    }

    public async estimate(): Promise<number> {
        return 0;
    }

    public async execute(): Promise<IMarkusToolResult[]> {
        return [];
    }
}
