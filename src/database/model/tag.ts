/**
 * @author WMXPY
 * @fileoverview Tag Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { ITag } from "../interface/tag";

export const TagSchema: Schema = new Schema({
    active: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
        unique: true,
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
