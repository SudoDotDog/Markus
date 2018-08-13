/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Tag
 */

import { ObjectID, ObjectId } from "bson";
import * as Controller from '../database/controller/import';

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
