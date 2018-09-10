/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Toolbox Interfaces
 */

import * as Controller from '../database/controller/import';
import * as Direct from '../direct/import';
import { IExpressAssertionJSONType } from '../service/interface';

export enum MARKUS_TOOL_RESPONSE_TYPE {
    STRING = "STRING",
    BOOLEAN = "BOOLEAN",
    NUMBER = "NUMBER",
    LINK = "LINK",
}

export type MarkusController = typeof Controller;
export type MarkusDirect = typeof Direct;

export interface IMarkusToolResult {
    type: MARKUS_TOOL_RESPONSE_TYPE;
    name: string;
    value: any;
}

export interface IMarkusToolArgs {
    [key: string]: any;
}

export interface IMarkusTool {
    readonly description: string;
    readonly name: string;
    readonly nickname: string;
    readonly require: IExpressAssertionJSONType;

    available: () => boolean;

    estimate: (args: IMarkusToolArgs) => Promise<number>;
    execute: (args: IMarkusToolArgs) => Promise<IMarkusToolResult[]>;
    verify: (args: IMarkusToolArgs) => boolean;
}

export interface IMarkusToolboxInfo {
    name: string;
    description: string;
    require: IExpressAssertionJSONType;
}
