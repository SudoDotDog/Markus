/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { imageModelToImageListResponse } from "../../util/image";
import { IImageListResponse } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

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


export const getActiveImagesByTag = async (tag: string): Promise<IImageModel[]> => {
    const results: IImageModel[] = await ImageModel.find({
        active: true,
        tags: tag,
    });

    if (results.length <= 0) {
        throw error(ERROR_CODE.NO_IMAGE_UNDER_TARGET_TAG);
    }

    return results;
};
