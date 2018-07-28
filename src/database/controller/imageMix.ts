/**
 * @author WMXPY
 * @fileoverview Image Mix Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error";
import { buildImageCallback, buildImageUserFriendlyCallback, mergeArray } from "../../util/image";
import { IFileManager } from "../../util/manager/file/import";
import { IImageCallback, IImageCreationConfig, IImageUserFriendlyCallback } from "../interface/image";
import { FileModel, IFileModel } from "../model/file";
import { IImageModel, ImageModel } from "../model/image";
import { ITagModel, TagModel } from "../model/tag";
import { getTagsIdArrayByNames } from './tag';

export const createImage = async (option: IImageCreationConfig): Promise<IImageCallback> => {
    const manager: IFileManager = option.manager;
    const { folder, filename } = await manager.save();

    const newFile: IFileModel = new FileModel({
        encoding: option.encoding,
        hash: option.hash,
        mime: option.mime,
        original: option.original,
        folder,
        filename,
        size: option.size,
    }).refIncrement();

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

        sameHashFile.refIncrement();
        await sameHashFile.save();
        await newImage.save();
        option.manager.release();
        return buildImageCallback(newImage, sameHashFile);
    } else {
        const newImage: IImageCallback = await createImage(option);
        return newImage;
    }
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
