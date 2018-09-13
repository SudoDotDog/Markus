/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Tag
 */

import { ObjectID } from "bson";
import * as Controller from '../database/controller/import';
import { ITagUserFriendly, ITagUserFriendlyAdvanced } from "../database/interface/tag";
import * as Mix from '../database/mix/import';
import { ITagModel } from "../database/model/tag";
import { ISearchResult, MARKUS_RESOURCE_TYPE } from "../service/interface";
import { convertBytesNumberToUserFriendlyFormat } from '../util/convert/data';
import { error, ERROR_CODE } from "../util/error/error";

export const getTagStringsNamesMapByTagIds = async (ids: ObjectID[]): Promise<Map<string, string>> => {
    const nameMap: Map<string, string> = new Map<string, string>();

    for (let id of ids) {
        if (nameMap.has(id.toString())) {
            continue;
        }
        const name: string = await Controller.Tag.getTagNameByTagId(id);
        nameMap.set(id.toString(), name);
    }

    return nameMap;
};

export const getTagStringsNamesMapByTagIdStrings = async (ids: string[]): Promise<Map<string, string>> => {
    const nameMap: Map<string, string> = new Map<string, string>();

    for (let id of ids) {
        if (nameMap.has(id)) {
            continue;
        }
        const name: string = await Controller.Tag.getTagNameByTagIdString(id);
        nameMap.set(id, name);
    }

    return nameMap;
};

export const getAllActiveTagUserFriendlyList = async (): Promise<ITagUserFriendly[]> => {
    const tags: ITagModel[] = await Controller.Tag.getAllActiveTags();
    const result: ITagUserFriendly[] = [];
    for (let tag of tags) {
        const count: number = await Controller.Image.getImageCountByTagId(tag._id);
        result.push({
            name: tag.name,
            createdAt: tag.createdAt,
            count,
        });
    }
    return result;
};

export const getAllAdvancedTagUserFriendlyList = async (): Promise<ITagUserFriendlyAdvanced[]> => {
    const tags: ITagModel[] = await Controller.Tag.getAllActiveTags();
    const result: ITagUserFriendlyAdvanced[] = [];
    for (let tag of tags) {
        const count: number = await Controller.Image.getImageCountByTagId(tag._id);
        const size: number = await Mix.Tag.getTagSizeByTagId(tag._id);
        result.push({
            name: tag.name,
            id: tag._id.toString(),
            createdAt: tag.createdAt,
            updatedAt: tag.updatedAt,
            size: convertBytesNumberToUserFriendlyFormat(size),
            count,
        });
    }
    return result;
};

export const renameTagToNewNameById = async (tagId: ObjectID, newName: string): Promise<ITagModel> => {
    const tag: ITagModel = await Controller.Tag.modifyTagName(tagId, newName);
    return tag;
};

export const renameTagToNewNameByTagCurrentName = async (tagName: string, newName: string): Promise<ITagModel> => {
    const tag: ITagModel | null = await Controller.Tag.rummageTag(tagName);
    if (tag) {
        const newTag: ITagModel = await Controller.Tag.modifyTagName(tag._id, newName);
        return newTag;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const tagSearch = async (cut: string): Promise<ISearchResult[]> => {
    const tags: ITagModel[] = await Controller.Tag.globalSearchTagByNameCut(cut);
    return tags.map((tag: ITagModel): ISearchResult => {
        return {
            type: MARKUS_RESOURCE_TYPE.TAG,
            name: tag.name,
            createdAt: tag.createdAt,
        };
    });
};
