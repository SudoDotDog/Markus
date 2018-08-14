/**
 * @author WMXPY
 * @description Toolbox
 * @fileoverview Tag Deduplicate
 */

import { IMarkusToolResult, IMarkusTool, MarkusController, MarkusDirect, MARKUS_TOOL_REQUIRE_TYPE, IMarkusToolEstimate, MARKUS_TOOL_ESTIMATE_TYPE } from "../toolbox";
import { ITagModel } from "../../database/model/tag";
import UniqueArray from "../../util/struct/uniqueArray";

export default class InternalToolTagDeduplicate implements IMarkusTool {
    public name: string = "@Internal:Tag-Duplicate-Remover";
    public description: string = "Remove duplicate tags";
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

    public verify(): boolean {
        return true;
    }

    public async estimate(): Promise<IMarkusToolEstimate> {
        const count: number = await this._controller.Tag.getTagsCount();
        const time = Math.round(count / 10);
        return {
            time,
            type: MARKUS_TOOL_ESTIMATE_TYPE.TIME,
        };
    }

    public async execute(): Promise<IMarkusToolResult[]> {
        const tags: ITagModel[] = await this._controller.Tag.getAllTags();
        const tagArr: UniqueArray<ITagModel> = new UniqueArray<ITagModel>();

        for (let tag of tags) {
            const value: ITagModel | null = this.isIncluded(tag, tagArr)
            if (value) {
                const { latest, removing } = this.determineRemoving(tag, value);
                await this._controller.Image.Risky_UpdateAllImageWithOldTagToANewTag(removing._id, latest._id);
                await this._controller.Tag.Risky_PermanentlyRemoveTag(removing._id);
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
        }
    }
}
