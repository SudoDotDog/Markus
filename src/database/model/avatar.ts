/**
 * @author WMXPY
 * @fileoverview Avatar Model
 */

import { ObjectID } from "bson";
import { Document, model, Model, Schema } from "mongoose";
import { IAvatar } from "../interface/avatar";

export const AvatarSchema: Schema = new Schema({
    active: {
        type: Boolean,
        default: true,
    },
    avatar: {
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

export interface IAvatarModel extends IAvatar, Document {
    deactivate: () => IAvatarModel;
    updateFile: (file: ObjectID) => IAvatarModel;
}

AvatarSchema.methods.deactivate = function (this: IAvatarModel): IAvatarModel {
    this.active = false;
    return this;
};

AvatarSchema.methods.updateFile = function (this: IAvatarModel, file: ObjectID): IAvatarModel {
    this.file = file;
    return this;
};

export const AvatarModel: Model<IAvatarModel> = model<IAvatarModel>("Avatar", AvatarSchema);
