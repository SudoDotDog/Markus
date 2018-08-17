/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Tag
 */

import { ObjectID } from "bson";
import * as Controller from '../database/controller/import';
import { ITagUserFriendly } from "../database/interface/tag";
import { ITagModel } from "../database/model/tag";

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
    for(let tag of tags){
        const count: number = await Controller.Image.getImageCountByTagId(tag._id);
        result.push({
            name: tag.name,
            createdAt: tag.createdAt,
            count,
        });
    }
    return result;
};
