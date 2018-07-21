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
    setPrefix: (prefix: string) => boolean;
    increase: () => ITagModel;
    reduce: () => ITagModel;
}

TagSchema.methods.setPrefix = function (this: ITagModel, prefixE: string): boolean {
    if (prefixE.length < 1) {
        return false;
    }
    const prefix: string = prefixE.toUpperCase();
    if (prefix.indexOf('MARKUS~') !== -1) {
        return false;
    }

    this.prefix = prefix;
    return true;
};

TagSchema.methods.increase = function (this: ITagModel): ITagModel {
    this.stepper++;
    this.count++;
    return this;
};

TagSchema.methods.reduce = function (this: ITagModel): ITagModel {
    if (this.count > 0) {
        this.count--;
    }

    return this;
};

export const TagModel: Model<ITagModel> = model<ITagModel>("Tag", TagSchema);
