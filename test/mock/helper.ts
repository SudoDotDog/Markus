/**
 * @author WMXPY
 * @fileoverview Mock Helper
 */

import { FileModel } from "../../src/database/model/file";
import { IImageModel, ImageModel } from "../../src/database/model/image";
import { ITagModel, TagModel } from "../../src/database/model/tag";
import { unique } from "../../src/util/image";

export const createRandomImage = async (): Promise<IImageModel> => {
    const newFile = new FileModel({
        direct: false,
        encoding: 'test',
        hash: 'test'+ unique(),
        mime: 'test',
        original: 'test',
        folder: 'test',
        filename: 'test',
        size: 155,
    });

    await newFile.save();

    const newImage = new ImageModel({
        tags: [],
        file: newFile._id,
    });

    await newImage.save();
    return newImage;
};

export const createRandomTag = async (): Promise<ITagModel> => {
    const newTag: ITagModel = new TagModel({
        name: 'test' + unique(),
    });

    await newTag.save();
    return newTag;
};
