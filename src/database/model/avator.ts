/**
 * @author WMXPY
 * @fileoverview Avator Model
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IAvator } from "../interface/avator";

export const AvatorSchema: Schema = new Schema({
    active: {
        type: Boolean,
        default: true,
    },
    avator: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    file: {
        type: Schema.Types.ObjectId,
        required: true,
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface IAvatorModel extends IAvator, Document {
    deactive: () => IAvatorModel;
    updateFile: (file: ObjectID) => IAvatorModel;
}

AvatorSchema.methods.deactive = function (this: IAvatorModel): IAvatorModel {
    this.active = false;
    return this;
};

AvatorSchema.methods.updateFile = function (this: IAvatorModel, file: ObjectID): IAvatorModel {
    this.file = file;
    return this;
};

export const AvatorModel: Model<IAvatorModel> = model<IAvatorModel>("Avator", AvatorSchema);
