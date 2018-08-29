/**
 * @author WMXPY
 * @fileoverview Markus Static Interfaces
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import { NextFunction, Request, Response } from "express";
import { IMarkusTool } from "./toolbox/toolbox";

export type middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export enum MODE {
    AMAZON_S3 = "AMAZONS3",
    FILE_SYSTEM = "FILESYSTEM",
}

export interface IConfig {
    crossOrigin?: string;
    host: string;
    database: string;
    imagePath: string;
    tempPath: string;
    imagePFolder: number;
    isDebug: boolean;
    maxThread: number; // keep
    uploadLimit: number;
    portNumber: number;
    verbose: boolean;
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

export interface IMarkusExtensionConfig {
    middleware: { // keep
        prepares: middleware[];
        permissions: middleware[];
        after: middleware[];
    };
    tools: IMarkusTool[];
}
