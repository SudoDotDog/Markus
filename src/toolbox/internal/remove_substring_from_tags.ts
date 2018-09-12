/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Remove substring from tags
 */

import * as Controller from '../../database/controller/import';
import { ITagModel } from '../../database/model/tag';
import { EXPRESS_ASSERTION_TYPES_END, IExpressAssertionJSONType } from '../../service/interface';
import { IMarkusTool, IMarkusToolArgs, IMarkusToolResult, MARKUS_TOOL_RESPONSE_TYPE } from "../interface";

export default class InternalToolRemoveSubstringFromTags implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Remove-Substring-From-Tags";
    public readonly nickname: string = 'Remove-Substring-From-Tags';
    public readonly description: string = "None";
    public readonly require: IExpressAssertionJSONType = {
        replace: { type: EXPRESS_ASSERTION_TYPES_END.STRING },
    };

    public available(): boolean {
        return true;
    }

    public verify(args: IMarkusToolArgs): boolean {
        if (args.replace) {
            return true;
        }
        return false;
    }

    public async estimate(): Promise<number> {
        const count: number = await Controller.Tag.getTagsCount();
        const time = Math.round(count / 4);
        return time;
    }

    public async execute(args: IMarkusToolArgs): Promise<IMarkusToolResult[]> {
        const tags: ITagModel[] = await Controller.Tag.getAllTags();
        const replace: string = args.replace;
        let replaced: number = 0;
        for (let tag of tags) {
            const newName: string = tag.name.replace(replace, "");
            if (newName !== tag.name) {
                tag.name = newName;
                Controller.Tag.saveTag(tag);
                replaced++;
            }
        }
        return [{
            type: MARKUS_TOOL_RESPONSE_TYPE.STRING,
            name: 'Replaced',
            value: replaced,
        }];
    }
}
