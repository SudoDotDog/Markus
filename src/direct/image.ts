
/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Image
 */

import { ObjectID, ObjectId } from "bson";
import * as Controller from '../database/controller/import';
import { IImageCallback, IImageUserFriendlyCallback } from "../database/interface/image";
import { IFileModel } from "../database/model/file";
import { IImageModel } from "../database/model/image";
import { ITagModel } from "../database/model/tag";
import { touchDecrementAndRelease } from "../util/data/file";
import { error, ERROR_CODE } from "../util/error";
import { buildImageCallback, buildImageUserFriendlyCallback, mergeArray } from "../util/image";

export const getImageCallbackById = async (id: ObjectID): Promise<IImageCallback> => {
    const image: IImageModel = await Controller.Image.getImageById(id);
    const file: IFileModel = await Controller.File.getActiveFileById(image.file);

    return buildImageCallback(image, file);
};

export const deactivateImageById = async (id: ObjectID | string): Promise<IImageModel> => {
    let imageId: ObjectID;
    if (typeof id === 'string') {
        try {
            imageId = new ObjectId(id);
        } catch (err) {
            throw error(ERROR_CODE.IMAGE_ID_NOT_VALID);
        }
    } else {
        imageId = id;
    }

    const result: IImageModel = await Controller.Image.getImageById(imageId);
    const file: IFileModel = await Controller.File.getActiveFileById(result.file);
    await touchDecrementAndRelease(file);
    result.deactivate();
    await file.save();
    await result.save();
    return result;
};

export const deactivateImageByTag = async (tag: string): Promise<IImageModel[]> => {
    const results: IImageModel[] = await Controller.Image.getActiveImagesByTag(tag);

    results.forEach(async (result: IImageModel) => {
        const file: IFileModel = await Controller.File.getActiveFileById(result.file);
        await touchDecrementAndRelease(file);
        result.deactivate();
        await file.save();
        await result.save();
    });
    return results;
};


export const getImageUserFriendlyCallbackByTag = async (tagString: string, includeInactive?: boolean): Promise<IImageUserFriendlyCallback[]> => {
    const tag: ITagModel = await Controller.Tag.getTagByName(tagString);

    let query: any = {
        tags: tag,
    };
    if (!includeInactive) { query.active = true; }

    const images: IImageModel[] = await ImageModel.find(query);
    const tagMap: Map<string, ITagModel> = new Map<string, ITagModel>();

    let tagIdsArray: ObjectID[] = [];
    for (let current of images) {
        tagIdsArray = mergeArray(tagIdsArray, current.tags);
    }

    const tags: ITagModel[] = await TagModel.find({
        _id: {
            $in: tagIdsArray,
        },
    });

    for (let current of tags) {
        tagMap.set(current.id.toString(), current);
    }

    return images.map((image: IImageModel): IImageUserFriendlyCallback => {
        const current: ITagModel[] = [];
        for (let i of image.tags) {
            const currentTag: ITagModel | undefined = tagMap.get(i.toString());

            if (currentTag) { current.push(currentTag); }
        }
        return buildImageUserFriendlyCallback(image, current);
    });
};