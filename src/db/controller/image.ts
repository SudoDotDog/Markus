/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from "../../../node_modules/@types/bson";
import { error, ERROR_CODE } from "../../util/error";
import { IImageCallback, IImageConfig } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

export const createImage = async (options: IImageConfig): Promise<IImageModel> => {
    const newImage: IImageModel = new ImageModel({
        encoding: options.encoding,
        mime: options.mime,
        original: options.original,
        path: options.path,
        size: options.size,
    });

    await newImage.save();
    return newImage;
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
    };
};
