/**
 * @author WMXPY
 * @description Mix
 * @fileoverview Tag
 */

import * as Controller from '../controller/import';
import { IFileModel } from '../model/file';
import { IImageModel } from '../model/image';
import { ITagModel } from '../model/tag';
import { ObjectID } from 'bson';

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
    files.forEach((file: IFileModel)=> size += file.size);
    return size;
};