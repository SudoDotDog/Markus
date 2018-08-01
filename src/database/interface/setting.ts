/**
 * @author WMXPY
 * @fileoverview Setting Interface
 */

import { ObjectID } from "bson";

export enum INTERNAL_SETTING {
    WHITE_FOUR_O_FOUR_IMAGE = "white_404_image",
    BLACK_FOUR_O_FOUR_IMAGE = "black_404_image",
}

export interface IInternalSetting {
    [INTERNAL_SETTING.WHITE_FOUR_O_FOUR_IMAGE]: ObjectID;
    [INTERNAL_SETTING.BLACK_FOUR_O_FOUR_IMAGE]: ObjectID;
}

export enum SETTING_CATEGORY {
    INTERNAL = "INTERNAL",
    EXTERNAL = "EXTERNAL",
}

export interface ISettingConfig {
    category: SETTING_CATEGORY;
    name: string;
    value: any;
}

export interface ISetting extends ISettingConfig {
    createdAt: Date;
    updatedAt: Date;
}
