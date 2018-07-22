/**
 * @author WMXPY
 * @fileoverview Mix Controller
 */

import { IImageCreationConfig } from "../interface/image";
import { ImageModel } from "../model/image";
import { TagModel } from "../model/tag";

export const emptyDatabase = async (): Promise<void> => {
    await ImageModel.remove({});
    await TagModel.remove({});
    return;
};

export const createImage = async (option: IImageCreationConfig): Promise<IImageModel> => {
    const file:

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