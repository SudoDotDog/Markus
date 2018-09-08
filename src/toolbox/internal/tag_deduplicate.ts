/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Tag Deduplicate
 */

import * as Controller from '../../database/controller/import';
import { ITagModel } from "../../database/model/tag";
import { IExpressAssertionJSONType } from "../../service/interface";
import UniqueArray from "../../util/struct/uniqueArray";
import { IMarkusTool, IMarkusToolResult } from "../interface";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public readonly name: string = "MT@Internal-Tool^Tag-Duplicate-Remover";
    public readonly nickname: string = 'Tag-Duplicate-Remover';
    public readonly description: string = "Remove duplicate tags";
    public readonly require: IExpressAssertionJSONType = {};

    public available(): boolean {
        return true;
    }

    public verify(): boolean {
        return true;
    }

    public async estimate(): Promise<number> {
        const count: number = await Controller.Tag.getTagsCount();
        const time = Math.round(count / 2);
        return time;
    }

    public async execute(): Promise<IMarkusToolResult[]> {
        const tags: ITagModel[] = await Controller.Tag.getAllTags();
        const tagArr: UniqueArray<ITagModel> = new UniqueArray<ITagModel>();

        for (let tag of tags) {
            const value: ITagModel | null = this.isIncluded(tag, tagArr);
            if (value) {
                const { latest, removing } = this.determineRemoving(tag, value);
                await Controller.Image.Risky_UpdateAllImageWithOldTagToANewTag(removing._id, latest._id);
                await Controller.Tag.Risky_PermanentlyRemoveTag(removing._id);
            } else {
                tagArr.push(tag);
            }
        }
        return [];
    }

    protected isIncluded(tag: ITagModel, tagArr: UniqueArray<ITagModel>): ITagModel | null {
        const value: ITagModel | null = tagArr.find((element: ITagModel) => {
            return element.name === tag.name;
        });
        return value;
    }

    protected determineRemoving(tag1: ITagModel, tag2: ITagModel): {
        removing: ITagModel;
        latest: ITagModel;
    } {
        let latest: ITagModel;
        let removing: ITagModel;
        if (new Date(tag1.updatedAt) > new Date(tag2.updatedAt)) {
            latest = tag1;
            removing = tag2;
        } else {
            latest = tag2;
            removing = tag1;
        }

        return {
            latest,
            removing,
        };
    }
}
