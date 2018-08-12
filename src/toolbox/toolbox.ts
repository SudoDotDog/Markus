/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Toolbox Interfaces
 */

import * as Controller from '../database/controller/import';
import * as Direct from '../direct/import';

export enum MarkusRequireType {
    STRING = "STRING",
}

export enum MarkusResponseType {
    STRING = "STRING",
    LINK = "LINK",
}

export type MarkusController = typeof Controller;
export type MarkusDirect = typeof Direct;

export interface IMarkusResult {
    type: MarkusResponseType;
    value: any;
}

export interface IMarkusTool {
    controller?: (controller: MarkusController) => void;
    direct?: (direct: MarkusDirect) => void;
    name: string;
    description: string;
    require: MarkusRequireType[];
    verify: (...args: any[]) => boolean;
    execute: (...args: any[]) => Promise<IMarkusResult[]>;
}
