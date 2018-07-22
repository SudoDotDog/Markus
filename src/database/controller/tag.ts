/**
 * @author WMXPY
 * @fileoverview Tag Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from '../../util/error';
import { ITagConfig } from "../interface/tag";
import { ITagModel, TagModel } from "../model/tag";

export const createTag = async (options: ITagConfig): Promise<ITagModel> => {
    const newTag: ITagModel = new TagModel({
        name: options.name,
    });

    await newTag.save();
    return newTag;
};

export const getTagsIdArrayByNames = async (names: string[]): Promise<ObjectID[]> => {
    const tagsArray: ITagModel[] = await getTagsArrayByNames(names);
    const tags: ObjectID[] = tagsArray.map((tag: ITagModel) => tag._id);
    return tags;
};

export const getTagsArrayByNames = async (names: string[]): Promise<ITagModel[]> => {
    const tagArray: ITagModel[] = [];
    for (let name of names) {
        const current: ITagModel = await getTagByName(name);
        tagArray.push(current);
    }
    return tagArray;
};

export const getTagsMapByNames = async (names: string[]): Promise<Map<string, ITagModel>> => {
    const map: Map<string, ITagModel> = new Map<string, ITagModel>();
    for (let name of names) {
        const current: ITagModel = await getTagByName(name);
        map.set(name, current);
    }
    return map;
};

export const getTagByName = async (name: string): Promise<ITagModel> => {
    const tag: ITagModel | null = await TagModel.findOne({ name });
    if (tag) {
        return tag;
    } else {
        const newTag = await createTag({ name });
        return newTag;
    }
};
