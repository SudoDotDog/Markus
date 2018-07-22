/**
 * @author WMXPY
 * @fileoverview Image Mix Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { buildImageCallback, imageModelToImageListResponse, releaseStorage } from "../../util/image";
import { IImageCallback, IImageCreationConfig, IImageListResponse } from "../interface/image";
import { FileModel, IFileModel } from "../model/file";
import { IImageModel, ImageModel } from "../model/image";
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

export const getImagesByTag = async (tag: string): Promise<IImageListResponse[]> => {
    const images: IImageModel[] = await ImageModel.find({
        tags: tag,
        active: true,
    });

    return images.map((image: IImageModel): IImageListResponse => {
        return imageModelToImageListResponse(image);
    });
};
