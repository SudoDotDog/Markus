
/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Image
 */

import { ObjectID, ObjectId } from "bson";
import * as Controller from '../database/controller/import';
import { IImageCallback, IImageCreationConfig, IImageUserFriendlyCallback } from "../database/interface/image";
import { IFileModel } from "../database/model/file";
import { IImageModel } from "../database/model/image";
import { ITagModel } from "../database/model/tag";
import { touchDecrementAndRelease } from "../util/data/file";
import { error, ERROR_CODE } from "../util/error";
import { buildImageCallback, buildImageUserFriendlyCallback, mergeArray } from "../util/image";
import { IFileManager } from "../util/manager/file/import";

export const createImageByIImageCreationConfig = async (option: IImageCreationConfig): Promise<IImageCallback> => {
    const file: IFileModel = await Controller.File.createOrUpdateAFileByHashAndManager(option.hash, option.manager, {
        encoding: option.encoding,
        mime: option.mime,
        original: option.original,
        size: option.size,
    });
    const tags: ObjectID[] = await Controller.Tag.getTagsIdArrayByNames(option.tags);
    const image: IImageModel = await Controller.Image.createImage({
        tags,
        file: file._id,
    });
    return buildImageCallback(image, file);
};

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

export const deactivateImageByTagString = async (tagString: string): Promise<IImageModel[]> => {
    const tag: ITagModel = await Controller.Tag.getTagByName(tagString);
    const results: IImageModel[] = await Controller.Image.getActiveImagesByTag(tag._id);

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
    let images: IImageModel[];

    if (includeInactive) {
        images = await Controller.Image.getAllActiveAndInactiveImagesByTag(tag._id);
    } else {
        images = await Controller.Image.getActiveImagesByTag(tag._id);
    }

    const tagMap: Map<string, ITagModel> = new Map<string, ITagModel>();

    let tagIdsArray: ObjectID[] = [];
    for (let current of images) {
        tagIdsArray = mergeArray(tagIdsArray, current.tags);
    }

    const tags: ITagModel[] = await Controller.Tag.getTagsListByIds(tagIdsArray);

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

export const getImagesCallbacksByTag = async (tagString: string, includeInactive?: boolean): Promise<IImageCallback[]> => {
    const tag: ITagModel = await Controller.Tag.getTagByName(tagString);

    let images: IImageModel[];
    if (includeInactive) {
        images = await Controller.Image.getAllActiveAndInactiveImagesByTag(tag._id);
    } else {
        images = await Controller.Image.getActiveImagesByTag(tag._id);
    }
    const fileIdsArray: ObjectID[] = images.map((image) => image.file);
    const fileMap = await Controller.File.getFileStringModelMapByFileIdsArray(fileIdsArray);

    return images.map((image: IImageModel): IImageCallback => {
        const currentFile: IFileModel | undefined = fileMap.get(image.file.toString());
        if (!currentFile) { throw error(ERROR_CODE.FILE_NOT_FOUND); }
        return buildImageCallback(image, currentFile);
    });
};
