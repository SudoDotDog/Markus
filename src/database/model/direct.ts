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
        required: false,
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
        default: 0,
    },
    size: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: false,
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IDirectModel extends IDirect, Document {
    deactivate: () => IDirectModel;
}

DirectSchema.methods.deactivate = function (this: IDirectModel): IDirectModel {
    this.active = false;
    return this;
};

export const DirectModel: Model<IDirectModel> = model<IDirectModel>("Direct", DirectSchema);
