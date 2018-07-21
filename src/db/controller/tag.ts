/**
 * @author WMXPY
 * @fileoverview Tag Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from '../../util/error';
import { ITagConfig } from "../interface/tag";
import { ITagModel, TagModel } from "../model/tag";

export const createTag = async (options: ITagConfig): Promise<ITagModel> => {
    const prefix = 'MARKUS~' + options.name.toUpperCase();
    const newTag: ITagModel = new TagModel({
        count: 0,
        name: options.name,
        prefix,
        stepper: 0,
    });

    await newTag.save();
    return newTag;
};

export const increase = async (tagId: ObjectID) => {
    const tag: ITagModel | null = await TagModel.findOne({ _id: tagId });
    if (!tag) {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }
    return;
};
