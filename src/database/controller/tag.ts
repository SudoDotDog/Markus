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
