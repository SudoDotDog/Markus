/**
 * @author WMXPY
 * @fileoverview Global declare
 */

import { IFileManager } from "../util/manager/file/import";

declare global {
    namespace Express {
        // tslint:disable-next-line
        interface Request {
            manager: IFileManager;
            valid?: boolean;
        }
    }
}
