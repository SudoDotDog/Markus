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
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IImageModel extends IImage, Document {

}

export const ImageModel: Model<IImageModel> = model<IImageModel>("Image", ImageSchema);