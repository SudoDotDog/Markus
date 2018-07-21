/**
 * @author WMXPY
 * @fileoverview Tag Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { ITag } from "../interface/tag";

export const TagSchema: Schema = new Schema({
    count: {
        type: Number,
        required: true,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    prefix: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    stepper: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });


export interface ITagModel extends ITag, Document {
}

export const TagModel: Model<ITagModel> = model<ITagModel>("Tag", TagSchema);
