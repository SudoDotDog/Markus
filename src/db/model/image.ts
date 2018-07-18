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
    encoding: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        index: true,
        required: true,
    },
    mime: {
        type: String,
        required: true,
    },
    original: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
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
    deactive: () => void;
}

ImageSchema.methods.deactive = function (this: IImageModel): IImageModel {
    this.active = false;
    return this;
};

export const ImageModel: Model<IImageModel> = model<IImageModel>("Image", ImageSchema);
