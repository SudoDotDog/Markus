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
    },
    temp: {
        type: {
            count: Number,
            time: Date,
            size: Number,
        },
        required: false,
    }
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface ITagModel extends ITag, Document {
    rename: (newName: string) => ITagModel;
}

TagSchema.methods.rename = function (this: ITagModel, newName: string): ITagModel {
    this.name = newName;
    return this;
};

export const TagModel: Model<ITagModel> = model<ITagModel>("Tag", TagSchema);
