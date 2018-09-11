/**
 * @author WMXPY
 * @fileoverview Direct Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { IDirect } from "../interface/direct";

export const DirectSchema: Schema = new Schema({
    active: {
        type: Boolean,
        default: true,
    },
    ctime: {
        type: Date,
    },
    hash: {
        type: String,
        required: true,
    },
    folder: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IDirectModel extends IDirect, Document {
    deactivate: () => IDirectModel;
    complete: () => IDirectModel;
}

DirectSchema.methods.deactivate = function (this: IDirectModel): IDirectModel {
    this.active = false;
    return this;
};

DirectSchema.methods.complete = function (this: IDirectModel, hash: string, size: number): IDirectModel {
    this.status = true;
    this.hash = hash;
    this.size = size;
    return this;
};

export const DirectModel: Model<IDirectModel> = model<IDirectModel>("Direct", DirectSchema);
