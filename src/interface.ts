/**
 * @author WMXPY
 * @fileoverview Markus Static Interfaces
 */

// tslint:disable-next-line
/// <reference path="./declare/global.ts" />

import { NextFunction, Request, Response } from "express";

export type middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
