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
    path: {
        type: String,
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
