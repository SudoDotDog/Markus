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
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface ITagModel extends ITag, Document {
    rename: (newName: string) => ITagModel;
    updateTemp: (info: {
        count?: number;
        size?: number;
    }) => ITagModel;
    removeTemp: () => boolean;
}

TagSchema.methods.rename = function (this: ITagModel, newName: string): ITagModel {
    this.name = newName;
    return this;
};

TagSchema.methods.updateTemp = function (this: ITagModel, info: {
    count?: number;
    size?: number;
}): ITagModel {
    const now = new Date();
    if (!this.temp) {
        this.temp = {
            count: info.count || 0,
            size: info.size || 0,
            time: now,
        };
    } else {
        this.temp = {
            count: info.count || this.temp.count,
            size: info.size || this.temp.size,
            time: now,
        };
    }
    return this;
};

TagSchema.methods.removeTemp = function (this: ITagModel): boolean {
    if (this.temp) {
        this.temp = undefined;
        return true;
    } else {
        return false;
    }
};

export const TagModel: Model<ITagModel> = model<ITagModel>("Tag", TagSchema);
