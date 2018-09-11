/**
 * @author WMXPY
 * @fileoverview Mock Helper
 */

import { FileModel } from "../../src/database/model/file";
import { IImageModel, ImageModel } from "../../src/database/model/image";

export const createRandomImage = async (): Promise<IImageModel> => {
    const newFile = new FileModel({
        encoding: 'test',
        hash: 'test',
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
