/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID, ObjectId } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { imageModelToImageListResponse } from "../../util/image";
import { IImageListResponse } from "../interface/image";
import { IFileModel } from "../model/file";
import { IImageModel, ImageModel } from "../model/image";
import { getFileById } from "./imageMix";

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

    const file: IFileModel = await getFileById(result.file);
    file.refDecrement();
    result.deactive();
    await file.save();
    await result.save();
    return result;
};

export const deactiveImageByTag = async (tag: string): Promise<IImageModel[]> => {
    const results: IImageModel[] = await ImageModel.find({ tags: tag });

    if (results.length <= 0) {
        throw error(ERROR_CODE.NO_IMAGE_UNDER_TARGET_TAG);
    }

    results.forEach(async (result: IImageModel) => {
        const file: IFileModel = await getFileById(result.file);
        file.refDecrement();
        result.deactive();
        await file.save();
        await result.save();
    });

    return results;
};

export const getImageById = async (id: ObjectID): Promise<IImageModel> => {
    const image: IImageModel | null = await ImageModel.findOne({
        _id: id,
        active: true,
    });
    if (!image) {
        throw error(ERROR_CODE.IMAGE_GET_FAILED);
    }

    return image;
};

export const getImageList = async (): Promise<IImageListResponse[]> => {
    const images: IImageModel[] | null = await ImageModel.find({});
    if (!images) {
        throw error(ERROR_CODE.IMAGE_GET_LIST_FAILED);
    }
    return images.map((image: IImageModel) => {
        return imageModelToImageListResponse(image);
    });
};
