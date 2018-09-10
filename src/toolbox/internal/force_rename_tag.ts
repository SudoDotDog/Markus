/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Force Rename Tag
 */

import * as Controller from '../../database/controller/import';
import { ITagModel } from '../../database/model/tag';
import { IExpressAssertionJSONType, EXPRESS_ASSERTION_TYPES_END } from '../../service/interface';
import { IMarkusTool, IMarkusToolResult, IMarkusToolArgs, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";
import { matchMarkusToolPattern } from '../util/parse';
import { ObjectId } from 'bson';

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
        if(original !== args.name){
            renamed = true;
            tag.name = args.name;
        }

        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.BOOLEAN,
            name: 'Renamed',
            value: renamed,
        }];
    }
}
