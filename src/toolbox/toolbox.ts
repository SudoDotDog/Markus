/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Toolbox Interfaces
 */

import * as Controller from '../database/controller/import';
import * as Direct from '../direct/import';

export enum MARKUS_REQUIRE_TYPE {
    STRING = "STRING",
}

export enum MARKUS_RESPONSE_TYPE {
    STRING = "STRING",
    LINK = "LINK",
}

export type MarkusController = typeof Controller;
export type MarkusDirect = typeof Direct;

export interface IMarkusResult {
    type: MARKUS_RESPONSE_TYPE;
    name: string;
    value: any;
}

export interface IMarkusTool {
    controller?: (controller: MarkusController) => void;
    direct?: (direct: MarkusDirect) => void;
    name: string;
    description: string;
    require: MARKUS_REQUIRE_TYPE[];
    verify: (...args: any[]) => boolean;
    execute: (...args: any[]) => Promise<IMarkusResult[]>;
}

export interface IMarkusToolboxInfo {
    name: string;
    description: string;
    require: MARKUS_REQUIRE_TYPE[];
}
