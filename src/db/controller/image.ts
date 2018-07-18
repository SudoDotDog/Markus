/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { IImageCallback, IImageConfig, IImageListResponse } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

export const emptyDatabase = async (): Promise<void> => {
    await ImageModel.remove({});
    return;
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

export const deactiveImageById = async (id: ObjectID): Promise<any> => {
    const result: any = await ImageModel.remove({ _id: id });
    return result;
};

export const getImageById = async (id: ObjectID): Promise<IImageCallback> => {
    const image: IImageModel | null = await ImageModel.findOne({
        _id: id,
        active: true,
    });
    if (!image) {
        throw error(ERROR_CODE.IMAGE_GET_FAILED);
    }

    return {
        createdAt: image.createdAt,
        encoding: image.encoding,
        mime: image.mime,
        original: image.original,
        path: image.path,
        size: image.size,
        tags: image.tags,
    };
};

export const getImageList = async (): Promise<IImageListResponse[]> => {
    const images: IImageModel[] | null = await ImageModel.find({});
    if (!images) {
        throw error(ERROR_CODE.IMAGE_GET_LIST_FAILED);
    }
    return images.map((image: IImageModel) => {
        return {
            active: image.active,
            id: image.id,
            createdAt: image.createdAt,
            original: image.original,
            size: image.size,
            tags: image.tags,
        };
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
