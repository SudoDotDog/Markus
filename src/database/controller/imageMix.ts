/**
 * @author WMXPY
 * @fileoverview Image Mix Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { buildImageCallback, buildImageUserFriendlyCallback, mergeArray, releaseStorage } from "../../util/image";
import { IImageCallback, IImageCreationConfig, IImageUserFriendlyCallback } from "../interface/image";
import { FileModel, IFileModel } from "../model/file";
import { IImageModel, ImageModel } from "../model/image";
import { ITagModel, TagModel } from "../model/tag";
import { getImageById } from "./image";
import { getTagsIdArrayByNames } from './tag';

export const getFileById = async (id: ObjectID): Promise<IFileModel> => {
    const file: IFileModel | null = await FileModel.findOne({
        _id: id,
        active: true,
    });
    if (!file) {
        throw error(ERROR_CODE.FILE_NOT_FOUND);
    }

    return file;
};

export const createImage = async (option: IImageCreationConfig): Promise<IImageCallback> => {
    const newFile: IFileModel = new FileModel({
        encoding: option.encoding,
        hash: option.hash,
        mime: option.mime,
        original: option.original,
        path: option.path,
        size: option.size,
    });

    const tags: ObjectID[] = await getTagsIdArrayByNames(option.tags);

    const newImage: IImageModel = new ImageModel({
        tags,
        file: newFile._id,
    });

    await newFile.save();
    await newImage.save();
    return buildImageCallback(newImage, newFile);
};

export const createDuplicateImage = async (option: IImageCreationConfig): Promise<IImageCallback> => {
    const sameHashFile: IFileModel | null = await FileModel.findOne({
        active: true,
        hash: option.hash,
    });

    if (sameHashFile) {
        const tags: ObjectID[] = await getTagsIdArrayByNames(option.tags);

        const newImage: IImageModel = new ImageModel({
            tags,
            file: sameHashFile._id,
        });

        await newImage.save();
        await releaseStorage(option.path);
        return buildImageCallback(newImage, sameHashFile);
    } else {
        const newImage = await createImage(option);
        return newImage;
    }
};

export const getImageCallbackById = async (id: ObjectID): Promise<IImageCallback> => {
    const image: IImageModel = await getImageById(id);
    const file: IFileModel = await getFileById(image.file);

    return buildImageCallback(image, file);
};

export const getImageUserFriendlyCallbackByTag = async (tagString: string, includeInactive?: boolean): Promise<IImageUserFriendlyCallback[]> => {
    const tag: ITagModel | null = await TagModel.findOne({ name: tagString });
    if (!tag) { throw error(ERROR_CODE.TAG_NOT_FOUND); }

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


export const getImagesCallbacksByTag = async (tagString: string, includeInactive?: boolean): Promise<IImageCallback[]> => {
    const tag: ITagModel | null = await TagModel.findOne({ name: tagString });
    if (!tag) { throw error(ERROR_CODE.TAG_NOT_FOUND); }

    let query: any = {
        tags: tag,
    };
    if (!includeInactive) { query.active = true; }
    const images: IImageModel[] = await ImageModel.find(query);

    const fileMap: Map<string, IFileModel> = new Map<string, IFileModel>();
    const fileIdsArray: ObjectID[] = images.map((image) => image.file);

    const files: IFileModel[] = await FileModel.find({
        _id: {
            $in: fileIdsArray,
        },
    });

    for (let file of files) {
        fileMap.set(file._id.toString(), file);
    }

    return images.map((image: IImageModel): IImageCallback => {
        const currentFile: IFileModel | undefined = fileMap.get(image.file.toString());
        if (!currentFile) { throw error(ERROR_CODE.FILE_NOT_FOUND); }
        return buildImageCallback(image, currentFile);
    });
};
