/**
 * @author WMXPY
 * @fileoverview Setting Model
 */

import { Document, model, Model, Schema } from "mongoose";
import { ISetting, SETTING_CATEGORY } from "../interface/setting";

export const SettingSchema: Schema = new Schema({
    category: {
        type: String,
        required: true,
        default: SETTING_CATEGORY.EXTERNAL,
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
    value: {
        type: Schema.Types.Mixed,
    },
}, {
        timestamps: {
            createdAt: true,
            updatedAt: true,
        },
    });

export interface ISettingModel extends ISetting, Document {
}

export const SettingModel: Model<ISettingModel> = model<ISettingModel>("Setting", SettingSchema);
