/**
 * @author WMXPY
 * @fileoverview Image Mix Controller
 */

import { ObjectID } from "bson";
import { releaseStorage } from "../../util/image";
import { IImageConfig, IImageCreationConfig } from "../interface/image";
import { FileModel, IFileModel } from "../model/file";
import { IImageModel, ImageModel } from "../model/image";
import { getTagsIdArrayByNames } from './tag';

export const createImage = async (option: IImageCreationConfig): Promise<IImageModel> => {
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
    return newImage;
};

export const createDuplicateImage = async (option: IImageCreationConfig): Promise<IImageConfig> => {
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
        return newImage;
    } else {
        const newImage = await createImage(option);
        return newImage;
    }
};
