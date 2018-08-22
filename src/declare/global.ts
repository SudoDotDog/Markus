/**
 * @author WMXPY
 * @fileoverview Global declare
 */

import { ResponseAgent } from "../script/handlers/util/agent";
import { IFileManager } from "../util/manager/file/import";

declare global {
    namespace Express {
        // tslint:disable-next-line
        interface Request {
            manager: IFileManager;
            valid?: boolean;
        }

        // tslint:disable-next-line
        interface Response {
            agent: ResponseAgent;
        }
    }
}
