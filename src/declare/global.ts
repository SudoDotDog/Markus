/**
 * @author WMXPY
 * @fileoverview Global declare
 */

import Log from "../log/log";
import { ResponseAgent } from "../script/handlers/util/agent";
import { IFileManager } from "../util/manager/file/import";

declare global {
    namespace Express {
        // tslint:disable-next-line
        interface Request {
            manager: IFileManager;
            log: Log;
            valid?: boolean;
        }

        // tslint:disable-next-line
        interface Response {
            agent: ResponseAgent;
        }
    }
}
