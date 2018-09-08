/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as Path from 'path';
import { IConfig, MODE } from '../../interface';
import { appropriateCurrentDateName } from '../../util/data/date';
import { tempPath } from "../../util/data/path";
import * as compress from '../../util/execute/compress/compress';
// tslint:disable-next-line
import { IMarkusTool, IMarkusToolEstimate, IMarkusToolResult, IMarkusToolTeapot, MarkusController, MarkusDirect, MARKUS_TOOL_ESTIMATE_TYPE, MARKUS_TOOL_REQUIRE_TYPE, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Full-Backup";
    public readonly nickname: string = 'Full-Backup';
    public readonly description: string = "Backup entire system and return download link";
    public readonly require: MARKUS_TOOL_REQUIRE_TYPE[] = [];
    public teapots: IMarkusToolTeapot[] = [];

    private _controller: MarkusController;
    private _direct: MarkusDirect;

    public constructor() {
        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: MarkusController): void {
        this._controller = controller;
    }

    public direct(direct: MarkusDirect): void {
        this._direct = direct;
    }

    public available(config: IConfig): boolean {
        if (config.mode === MODE.FILE_SYSTEM) {
            return true;
        }
        return false;
    }

    public verify(database: string): boolean {
        if (!database) {
            return false;
        }
        return true;
    }

    public async estimate(database: string): Promise<IMarkusToolEstimate> {
        return {
            time: 0,
            type: MARKUS_TOOL_ESTIMATE_TYPE.TIME,
        };
    }

    public async execute(database: string): Promise<IMarkusToolResult[]> {
        const tempLocation: string = tempPath();
        const instanceLogResult: string = await this._direct.Backup.createBackupInstance(tempLocation, database);
        const instancePath: string = Path.join(tempLocation, database);

        const databaseZipResult: compress.ICompressZipResult = await compress.zipFolder(instancePath, tempLocation, appropriateCurrentDateName(database + '-Database'));
        const picturesZipResult: compress.ICompressZipResult = await compress.zipFolder(global.MarkusConfig.imagePath, tempLocation, appropriateCurrentDateName(database + '-Pictures'));
        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Logs',
            value: instanceLogResult.length,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Database_size',
            value: databaseZipResult.bytes,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Pictures_size',
            value: picturesZipResult.bytes,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Database',
            value: Path.resolve(databaseZipResult.path),
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Pictures',
            value: Path.resolve(picturesZipResult.path),
        }];
    }
}
