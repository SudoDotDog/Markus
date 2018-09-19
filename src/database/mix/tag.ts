/**
 * @author WMXPY
 * @description Mix
 * @fileoverview Tag
 */

import { error, ERROR_CODE } from '#/util/error/error';
import { ObjectID } from 'bson';
import * as Controller from '../controller/import';
import { IFileModel } from '../model/file';
import { IImageModel, ImageModel } from '../model/image';
import { ITagModel, TagModel } from '../model/tag';

export const getAllFilesByTag = async (tagName: string): Promise<IFileModel[]> => {
    const tag: ITagModel = await Controller.Tag.getTagByName(tagName);
    const images: IImageModel[] = await Controller.Image.getActiveImagesByTag(tag._id);
    const files: IFileModel[] = await Controller.File.getFilesByIds(images.map((image: IImageModel) => image.file));

    return files;
};

export const getTagSizeByTagId = async (tag: ObjectID): Promise<number> => {
    const images: IImageModel[] = await Controller.Image.getAllActiveAndInactiveImagesByTagIgnoreNothing(tag);
    const files: IFileModel[] = await Controller.File.getFilesByIds(images.map((image: IImageModel) => image.file));
    let size: number = 0;
    files.forEach((file: IFileModel) => size += file.size);

    const targetTag: ITagModel | null = await TagModel.findOne({ _id: tag });
    if (!targetTag) {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }

    targetTag.updateTemp({ size });
    await targetTag.save();

    return size;
};

export const getImageCountByTagId = async (tagId: ObjectID): Promise<number> => {
    const count: number = await ImageModel.countDocuments({
        tags: tagId,
    });

    const tag: ITagModel | null = await TagModel.findOne({ _id: tagId });
    if (!tag) {
        throw error(ERROR_CODE.TAG_NOT_FOUND);
    }

    tag.updateTemp({ count });
    await tag.save();

    return count;
};
