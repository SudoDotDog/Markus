/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as Path from 'path';
import Config from '../../markus';
import { appropriateCurrentDateName } from '../../util/data/date';
import { tempPath } from "../../util/data/path";
import { ICompressZipResult, zipFolder } from '../../util/execute/compress/compress';
import { IMarkusTool, IMarkusToolEstimate, IMarkusToolResult, MarkusController, MarkusDirect, MARKUS_TOOL_ESTIMATE_TYPE, MARKUS_TOOL_REQUIRE_TYPE, MARKUS_TOOL_RESPONSE_TYPE } from "../toolbox";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public name: string = "@Internal:Full-Backup";
    public description: string = "Backup entire system and return download link";
    public require: MARKUS_TOOL_REQUIRE_TYPE[] = [];

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
        }
    }

    public async execute(database: string): Promise<IMarkusToolResult[]> {
        const tempLocation: string = tempPath();
        const instanceLogResult: string = await this._direct.Backup.createBackupInstance(tempLocation, database);
        const instancePath: string = Path.join(tempLocation, database);

        const databaseZipResult: ICompressZipResult = await zipFolder(instancePath, tempLocation, appropriateCurrentDateName(database + '-Database'));
        const picturesZipResult: ICompressZipResult = await zipFolder(Config.imagePath, tempLocation, appropriateCurrentDateName(database + '-Pictures'));
        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Logs',
            value: instanceLogResult.length,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Database',
            value: databaseZipResult.path,
        }, {
            type: MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Pictures',
            value: picturesZipResult.path,
        }];
    }
}
