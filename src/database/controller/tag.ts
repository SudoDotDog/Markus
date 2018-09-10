/**
 * @author WMXPY
 * @fileoverview Tag Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error/error";
import { ITagConfig } from "../interface/tag";
import { ITagModel, TagModel } from "../model/tag";

export const createTagWithOutSave = (options: ITagConfig): ITagModel => {
    const newTag: ITagModel = new TagModel({
        name: options.name,
    });

    return newTag;
};

export const rummageTag = async (name: string): Promise<ITagModel | null> => {
    const tag: ITagModel | null = await TagModel.findOne({ name });
    return tag;
};

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
        const current: ITagModel = await getOrCreateTagByName(name);
        tagArray.push(current);
    }
    return tagArray;
};

export const getTagsMapByNames = async (names: string[]): Promise<Map<string, ITagModel>> => {
    const map: Map<string, ITagModel> = new Map<string, ITagModel>();
    for (let name of names) {
        const current: ITagModel = await getOrCreateTagByName(name);
        map.set(name, current);
    }
    return map;
};

export const getOrCreateTagByName = async (name: string): Promise<ITagModel> => {
    const tag: ITagModel | null = await TagModel.findOne({ name });
    if (tag) {
        return tag;
    } else {
        const newTag = await createTag({ name });
        return newTag;
    }
};

export const getTagsListByIds = async (ids: ObjectID[]): Promise<ITagModel[]> => {
    const tags: ITagModel[] = await TagModel.find({
        _id: {
            $in: ids,
        },
    });
    return tags;
};

export const getTagByName = async (name: string): Promise<ITagModel> => {
    const tag: ITagModel | null = await TagModel.findOne({ name });
    if (tag) {
        return tag;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const getTagById = async (id: ObjectID): Promise<ITagModel> => {
    const tag: ITagModel | null = await TagModel.findOne({ _id: id });
    if (tag) {
        return tag;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const getTagNameByTagId = async (id: ObjectID): Promise<string> => {
    const tag: ITagModel | null = await TagModel.findOne({ _id: id });
    if (tag) {
        return tag.name;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const getTagNameByTagIdString = async (id: string): Promise<string> => {
    const tag: ITagModel | null = await TagModel.findOne({ _id: id });
    if (tag) {
        return tag.name;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const getAllTags = async (): Promise<ITagModel[]> => {
    const tags: ITagModel[] = await TagModel.find({});
    return tags;
};

export const getAllActiveTags = async (): Promise<ITagModel[]> => {
    const tags: ITagModel[] = await TagModel.find({
        active: true,
    });
    return tags;
};

export const getTagsCount = async (): Promise<number> => {
    const count: number = await TagModel.countDocuments({});
    return count;
};

export const modifyTagName = async (id: ObjectID, newName: string): Promise<ITagModel> => {
    const tag: ITagModel | null = await TagModel.findOne({ _id: id });
    const targetTag: ITagModel | null = await TagModel.findOne({ name: newName });
    if (targetTag) {
        throw error(ERROR_CODE.TAG_NAME_ALREADY_EXIST);
    }

    if (tag) {
        tag.rename(newName);
        await tag.save();
        return tag;
    } else {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
};

export const Risky_PermanentlyRemoveTag = async (tagId: ObjectID): Promise<void> => {
    await TagModel.deleteMany({
        _id: tagId,
    });
    return;
};

export const saveTag = async (tag: ITagModel): Promise<void> => {
    await tag.save();
    return;
};
