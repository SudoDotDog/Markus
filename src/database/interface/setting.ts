/**
 * @author WMXPY
 * @fileoverview Setting Interface
 */

import { ObjectID } from "bson";

export enum INTERNAL_SETTING {
    CROSS_ORIGIN = "cross_origin",
    DATABASE_HOST = "db_host",
    DATABASE_NAME = "db_name",
    DEBUG_MODE = "debug_mode",
    IMAGE_STORAGE_PATH = "image_storage_path",
    IMAGE_PER_FOLDER = "image_per_folder",
    MAX_RUNNING_THREAD = "max_thread",
    UPLOAD_SIZE_LIMIT = "upload_limit",
    HOST_PORT_NUMBER = "port_number",
    VERBOSE = "verbose",
    WHITE_FOUR_O_FOUR_IMAGE = "white_404_image",
    BLACK_FOUR_O_FOUR_IMAGE = "black_404_image",
}

export interface IInternalSetting {
    [INTERNAL_SETTING.CROSS_ORIGIN]: string;
    [INTERNAL_SETTING.DATABASE_HOST]: string;
    [INTERNAL_SETTING.DATABASE_NAME]: string;
    [INTERNAL_SETTING.DEBUG_MODE]: boolean;
    [INTERNAL_SETTING.IMAGE_STORAGE_PATH]: number;
    [INTERNAL_SETTING.IMAGE_PER_FOLDER]: number;
    [INTERNAL_SETTING.MAX_RUNNING_THREAD]: number;
    [INTERNAL_SETTING.UPLOAD_SIZE_LIMIT]: number;
    [INTERNAL_SETTING.HOST_PORT_NUMBER]: number;
    [INTERNAL_SETTING.VERBOSE]: boolean;
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
