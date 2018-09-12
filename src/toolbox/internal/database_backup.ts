/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Database backup
 */

import * as Path from 'path';
import * as Direct from '../../direct/import';
import { MODE } from '../../interface';
import { IExpressAssertionJSONType } from '../../service/interface';
import { appropriateCurrentDateName } from '../../util/data/date';
import { tempPath } from "../../util/data/path";
import * as compress from '../../util/execute/compress/compress';
// tslint:disable-next-line
import { IMarkusTool, IMarkusToolArgs, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";

export default class InternalToolDatabaseBackup implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Database-Backup";
    public readonly nickname: string = 'Database-Backup';
    public readonly description: string = "Backup entire system and return download link";
    public readonly require: IExpressAssertionJSONType = {};

    public available(): boolean {
        if (global.Markus.Config.mode === MODE.FILE_SYSTEM) {
            return true;
        }
        return false;
    }

    public verify(args: IMarkusToolArgs): boolean {
        if (!args.database) {
            return false;
        }
        return true;
    }

    public async estimate(): Promise<number> {
        return 0;
    }

    public async execute(args: IMarkusToolArgs): Promise<IMarkusToolResult[]> {
        const tempLocation: string = tempPath();
        const instanceLogResult: string = await Direct.Backup.createBackupInstance(tempLocation, args.database);
        const instancePath: string = Path.join(tempLocation, args.database);

        const databaseZipResult: compress.ICompressZipResult = await compress.zipFolder(instancePath, tempLocation, appropriateCurrentDateName(args.database + '-Database'));
        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Logs',
            value: instanceLogResult.length,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Database_size',
            value: databaseZipResult.bytes,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Database',
            value: Path.resolve(databaseZipResult.path),
        }];
    }
}
