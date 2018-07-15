/**
 * @author WMXPY
 * @fileoverview Image Controller
 */

import { IImageConfig } from "../interface/image";
import { IImageModel, ImageModel } from "../model/image";

export const createImage = async (options: IImageConfig): Promise<IImageModel> => {
    const newImage: IImageModel = new ImageModel({
        path: options.path,
    });

    await newImage.save();
    return newImage;
};
