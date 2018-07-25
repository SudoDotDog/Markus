/**
 * @author WMXPY
 * @fileoverview Image Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { IImage } from "../interface/image";

export const ImageSchema: Schema = new Schema({
    active: {
        type: Boolean,
        default: true,
    },
    file: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    tags: {
        type: [Schema.Types.ObjectId],
        required: true,
        index: true,
        default: [],
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IImageModel extends IImage, Document {
    deactivate: () => IImageModel;
}

ImageSchema.methods.deactivate = function (this: IImageModel): IImageModel {
    this.active = false;
    return this;
};

export const ImageModel: Model<IImageModel> = model<IImageModel>("Image", ImageSchema);
