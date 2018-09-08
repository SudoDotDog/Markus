/**
 * @author WMXPY
 * @fileoverview Markus Static Interfaces
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import { NextFunction, Request, Response } from "express";
import { IMarkusTool } from "./toolbox/interface";

export type middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export enum MODE {
    AMAZON_S3 = "AMAZONS3",
    FILE_SYSTEM = "FILESYSTEM",
}

export interface IConfig {
    crossOrigin?: string;
    host: string;
    database: string;
    documentation: boolean;
    imagePath: string;
    tempPath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number; // keep
    uploadLimit: number;
    portNumber: number;
    verbose: boolean;
    authorization: string[];
    white404ImagePath: string;
    black404ImagePath: string;
    mode: MODE;

    S3?: {
        bucket: string;
        accessKeyId: string;
        secretAccessKey: string;
        getPath: string;
    };
}

export interface IConfigTemplate {
    crossOrigin: number;
    host: number;
    database: number;
    documentation: number;
    imagePath: number;
    tempPath: number;
    imagePFolder: number;
    isDebug: number;
    maxThread: number;
    uploadLimit: number;
    portNumber: number;
    verbose: number;
    authorization: number;
    white404ImagePath: number;
    black404ImagePath: number;
    mode: number;
    S3_bucket: number;
    S3_accessKeyId: number;
    S3_secretAccessKey: number;
    S3_getPath: number;
}

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export interface IMarkusExtensionConfig {
    middleware: { // keep
        prepares: middleware[];
        permissions: middleware[];
        after: middleware[];
    };
    tools: IMarkusTool[];
}
