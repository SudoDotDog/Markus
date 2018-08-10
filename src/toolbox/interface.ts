/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Toolbox Interfaces
 */

import * as Controller from '../database/controller/import';
import * as Direct from '../direct/import';

export enum MarkusRequie {
    STRING = "string",
}

export type MarkusController = typeof Controller;
export type MarkusDirect = typeof Direct;

export interface IMarkusTool {
    controller: (controller: MarkusController) => void;
    direct: (direct: MarkusDirect) => void;
    name: string;
    description: string;
    require: MarkusRequie[];
    verify: (args: any[]) => boolean;
    execute: (args: any[]) => void;
}
