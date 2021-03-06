/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Force Rename Tag
 */

import { ObjectId } from 'bson';
import * as Controller from '../../database/controller/import';
import { ITagModel } from '../../database/model/tag';
import { EXPRESS_ASSERTION_TYPES_END, IExpressAssertionJSONType } from '../../service/interface';
import { IMarkusTool, IMarkusToolArgs, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";
import { matchMarkusToolPattern } from '../util/parse';

export default class InternalToolForceRenameTag implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Force-Rename-Tag";
    public readonly nickname: string = 'Force-Rename-Tag';
    public readonly description: string = "None";
    public readonly require: IExpressAssertionJSONType = {
        id: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
        name: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
    };

    public constructor() {
        this.verify = this.verify.bind(this);
    }

    public available(): boolean {
        return true;
    }

    public verify(args: IMarkusToolArgs): boolean {
        if (!matchMarkusToolPattern(this.require, args)) {
            return false;
        }
        if (!ObjectId.isValid(args.id)) {
            return false;
        }
        return true;
    }

    public async estimate(): Promise<number> {
        const time = 1;
        return time;
    }

    public async execute(args: IMarkusToolArgs): Promise<IMarkusToolResult[]> {
        const tag: ITagModel = await Controller.Tag.getTagById(args.id);
        const original: string = tag.name;

        let renamed: boolean = false;
        if (original !== args.name) {
            tag.name = args.name;
            await Controller.Tag.saveTag(tag);
            renamed = true;
        }

        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.BOOLEAN,
            name: 'Renamed',
            value: renamed,
        }];
    }
}
