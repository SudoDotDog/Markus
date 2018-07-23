/**
 * @author WMXPY
 * @fileoverview Avator Interface
 */

import { ObjectID } from "bson";

export interface IAvatorConfig {
    avator: string;
    file: ObjectID;
}

export interface IAvator extends IAvatorConfig {
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IAvatorCreationConfig {
    avator: string;
    encoding: string;
    hash: string;
    mime: string;
    original: string;
    path: string;
    size: number;
}

export interface IAvatorCallback {
    id: ObjectID;
    path: string;
}
