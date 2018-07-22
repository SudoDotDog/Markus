/**
 * @author WMXPY
 * @fileoverview File Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { IFile } from "../interface/file";

export const FileSchema: Schema = new Schema({
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

export interface IFileModel extends IFile, Document {
    deactive: () => IFileModel;
}

FileSchema.methods.deactive = function (this: IFileModel): IFileModel {
    this.active = false;
    return this;
};

export const FileModel: Model<IFileModel> = model<IFileModel>("File", FileSchema);
