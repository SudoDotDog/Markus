/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Toolbox Interfaces
 */

import * as Controller from '../database/controller/import';
import * as Direct from '../direct/import';
import { IConfig } from '../interface';

export enum MARKUS_TOOL_REQUIRE_TYPE {
    STRING = "STRING",
}

export enum MARKUS_TOOL_RESPONSE_TYPE {
    STRING = "STRING",
    LINK = "LINK",
}

export enum MARKUS_TOOL_ESTIMATE_TYPE {
    IMMEDIATE = "IMMEDIATELY",
    TIME = "TIME",
}

export type MarkusController = typeof Controller;
export type MarkusDirect = typeof Direct;

export interface IMarkusToolResult {
    type: MARKUS_TOOL_RESPONSE_TYPE;
    name: string;
    value: any;
}

export interface IMarkusToolEstimate {
    type: MARKUS_TOOL_ESTIMATE_TYPE;
    time: number;
}

export interface IMarkusToolTeapot {
    name: string;
    value: any;
}

export interface IMarkusTool {
    readonly description: string;
    readonly name: string;
    readonly nickname: string;
    readonly require: MARKUS_TOOL_REQUIRE_TYPE[];
    readonly teapots: IMarkusToolTeapot[];

    available: (config: IConfig) => boolean;

    controller?: (controller: MarkusController) => void;
    direct?: (direct: MarkusDirect) => void;

    estimate: (...args: any[]) => Promise<IMarkusToolEstimate>;
    execute: (...args: any[]) => Promise<IMarkusToolResult[]>;
    verify: (...args: any[]) => boolean;
}

export interface IMarkusToolboxInfo {
    name: string;
    description: string;
    require: MARKUS_TOOL_REQUIRE_TYPE[];
    teapots: IMarkusToolTeapot[];
}
