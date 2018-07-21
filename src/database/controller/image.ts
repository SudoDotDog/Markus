/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID, ObjectId } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { combineTagsArray, imageModelToImageCallback, imageModelToImageListResponse, imageModelToImageListResponseAdmin, releaseStorage } from "../../util/image";
import { IImageCallback, IImageConfig, IImageListResponse, IImageListResponseAdmin } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

export const createDeduplicateImage = async (Option: IImageConfig): Promise<IImageModel> => {
    const SameHashImage: IImageModel | null = await ImageModel.findOne({
        hash: Option.hash,
        active: true,
    });

    if (SameHashImage) {
        if (!Option.tags) {
            Option.tags = [];
        }
        const newTags = combineTagsArray(SameHashImage.tags, Option.tags);
        SameHashImage.tags = newTags;
        await SameHashImage.save();
        await releaseStorage(Option.path);
        return SameHashImage;
    } else {
        const newImage: IImageModel = await createImage(Option);
        return newImage;
    }
};

export const createImage = async (options: IImageConfig): Promise<IImageModel> => {
    const newImage: IImageModel = new ImageModel({
        encoding: options.encoding,
        hash: options.hash,
        mime: options.mime,
        original: options.original,
        path: options.path,
        size: options.size,
        tags: options.tags || [],
    });

    await newImage.save();
    return newImage;
};

export const deactiveImageById = async (id: ObjectID | string): Promise<IImageModel> => {
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
    const result: IImageModel | null = await ImageModel.findOne({ _id: imageId });

    if (!result) {
        throw error(ERROR_CODE.IMAGE_GET_FAILED);
    }

    result.deactive();
    await result.save();
    return result;
};

export const deactiveImageByTag = async (tag: string): Promise<IImageModel[]> => {
    const results: IImageModel[] = await ImageModel.find({ tags: tag });

    if (results.length <= 0) {
        throw error(ERROR_CODE.NO_IMAGE_UNDER_TARGET_TAG);
    }

    results.forEach(async (result: IImageModel) => {
        result.deactive();
        await result.save();
    });

    return results;
};

export const getImagesByTag = async (tag: string): Promise<IImageListResponse[]> => {
    const images: IImageModel[] = await ImageModel.find({
        tags: tag,
        active: true,
    });

    return images.map((image: IImageModel): IImageListResponse => {
        return imageModelToImageListResponse(image);
    });
};

export const getImagesByOriginalName = async (originalName: string): Promise<IImageListResponse[]> => {
    const images: IImageModel[] = await ImageModel.find({
        original: originalName,
        active: true,
    });

    return images.map((image: IImageModel): IImageListResponse => {
        return imageModelToImageListResponse(image);
    });
};

export const getImageById = async (id: ObjectID): Promise<IImageCallback> => {
    const image: IImageModel | null = await ImageModel.findOne({
        _id: id,
        active: true,
    });
    if (!image) {
        throw error(ERROR_CODE.IMAGE_GET_FAILED);
    }

    return imageModelToImageCallback(image);
};

export const getImageList = async (): Promise<IImageListResponseAdmin[]> => {
    const images: IImageModel[] | null = await ImageModel.find({});
    if (!images) {
        throw error(ERROR_CODE.IMAGE_GET_LIST_FAILED);
    }
    return images.map((image: IImageModel) => {
        return imageModelToImageListResponseAdmin(image);
    });
};

export const deactiveImage = async (id: ObjectID): Promise<void> => {
    const image: IImageModel | null = await ImageModel.findOne({
        _id: id,
        active: true,
    });
    if (!image) {
        throw error(ERROR_CODE.IMAGE_GET_FAILED);
    }

    image.deactive();
    await image.save();
    return;
};
