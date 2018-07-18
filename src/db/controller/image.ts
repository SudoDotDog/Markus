/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { imageModelToImageCallback, imageModelToImageListResponse } from "../../util/image";
import { IImageCallback, IImageConfig, IImageListResponse } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

export const emptyDatabase = async (): Promise<void> => {
    await ImageModel.remove({});
    return;
};

export const createDeduplicateImage = async (Option: IImageConfig): Promise<IImageModel> => {
    const SameHashImage: IImageModel | null = await ImageModel.findOne({
        hash: Option.hash,
    });

    if (SameHashImage) {
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

export const deactiveImageById = async (id: ObjectID): Promise<any> => {
    const result: any = await ImageModel.remove({ _id: id });
    return result;
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

export const getImageList = async (): Promise<IImageListResponse[]> => {
    const images: IImageModel[] | null = await ImageModel.find({});
    if (!images) {
        throw error(ERROR_CODE.IMAGE_GET_LIST_FAILED);
    }
    return images.map((image: IImageModel) => {
        return imageModelToImageListResponse(image);
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
