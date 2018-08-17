/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Environment Info
 */

import * as Path from 'path';
import Config from '../../markus';
import { appropriateCurrentDateName } from '../../util/data/date';
import { tempPath } from "../../util/data/path";
import * as compress from '../../util/execute/compress/compress';
import * as toolbox from "../toolbox";

export default class InternalToolTagDeduplicate implements toolbox.IMarkusTool {
    public readonly name: string = "@Internal:Full-Backup";
    public readonly description: string = "Backup entire system and return download link";
    public readonly require: toolbox.MARKUS_TOOL_REQUIRE_TYPE[] = [];
    public teapots: toolbox.IMarkusToolTeapot[] = [];

    private _controller: toolbox.MarkusController;
    private _direct: toolbox.MarkusDirect;

    public constructor() {
        this._controller = null as any;
        this._direct = null as any;
    }

    public controller(controller: toolbox.MarkusController): void {
        this._controller = controller;
    }

    public direct(direct: toolbox.MarkusDirect): void {
        this._direct = direct;
    }

    public verify(database: string): boolean {
        if (!database) {
            return false;
        }
        return true;
    }

    public async estimate(database: string): Promise<toolbox.IMarkusToolEstimate> {
        return {
            time: 0,
            type: toolbox.MARKUS_TOOL_ESTIMATE_TYPE.TIME,
        }
    }

    public async execute(database: string): Promise<toolbox.IMarkusToolResult[]> {
        const tempLocation: string = tempPath();
        const instanceLogResult: string = await this._direct.Backup.createBackupInstance(tempLocation, database);
        const instancePath: string = Path.join(tempLocation, database);

        const databaseZipResult: compress.ICompressZipResult = await compress.zipFolder(instancePath, tempLocation, appropriateCurrentDateName(database + '-Database'));
        const picturesZipResult: compress.ICompressZipResult = await compress.zipFolder(Config.imagePath, tempLocation, appropriateCurrentDateName(database + '-Pictures'));
        return [{
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Logs',
            value: instanceLogResult.length,
        },{
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Database_size',
            value: databaseZipResult.bytes,
        },{
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Pictures_size',
            value: picturesZipResult.bytes,
        }, {
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Database',
            value: Path.resolve(databaseZipResult.path),
        }, {
            type: toolbox.MARKUS_TOOL_RESPONSE_TYPE.LINK,
            name: 'Pictures',
            value: Path.resolve(picturesZipResult.path),
        }];
    }
}
