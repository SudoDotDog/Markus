/**
 * @author WMXPY
 * @fileoverview Global declare
 */

import { IConfig } from "../interface";
import Log from "../log/log";
import { ResponseAgent } from "../script/handlers/util/agent";
import { IFileManager } from "../util/manager/file/import";
import { IMarkusGlobalEnvironment, MARKUS_AUTHORIZATION_ROLE } from "./interface";

declare global {
    namespace Express {
        // tslint:disable-next-line
        interface Request {
            manager: IFileManager;
            log: Log;
            authRole?: MARKUS_AUTHORIZATION_ROLE[];
            valid?: boolean;
        }

        // tslint:disable-next-line
        interface Response {
            agent: ResponseAgent;
        }
    }

    namespace NodeJS {
        // tslint:disable-next-line
        interface Global {
            Markus: {
                Environment: IMarkusGlobalEnvironment,
                Config: IConfig,
            };
        }
    }
}
