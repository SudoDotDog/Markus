/**
 * @author WMXPY
 * @fileoverview Setting Controller
 */

import { error, ERROR_CODE } from "../../util/error/error";
import { IInternalSetting, SETTING_CATEGORY } from "../interface/setting";
import { ISettingModel, SettingModel } from "../model/setting";

export const getInternalSettingByName = async <Key extends keyof IInternalSetting>(name: Key): Promise<IInternalSetting[Key]> => {
    const setting: ISettingModel | null = await SettingModel.findOne({
        category: SETTING_CATEGORY.INTERNAL,
        name,
    });
    if (!setting) {
        throw error(ERROR_CODE.SETTING_NOT_FOUND);
    }
    return setting.value;
};

export const getExternalSettingByName = async (name: string): Promise<any> => {
    const setting: ISettingModel | null = await SettingModel.findOne({
        category: SETTING_CATEGORY.EXTERNAL,
        name,
    });
    if (!setting) {
        throw error(ERROR_CODE.SETTING_NOT_FOUND);
    }
    return setting.value;
};

export const setInternalSetting = async <Key extends keyof IInternalSetting>(name: Key, value: IInternalSetting[Key]): Promise<ISettingModel> => {
    const setting: ISettingModel = await updateSettingOrCreateSetting(name, SETTING_CATEGORY.INTERNAL, value);
    return setting;
};

export const setExternalSetting = async (name: string, value: any): Promise<ISettingModel> => {
    const setting: ISettingModel = await updateSettingOrCreateSetting(name, SETTING_CATEGORY.EXTERNAL, value);
    return setting;
};

export const getAllInternalSetting = async (): Promise<ISettingModel[]> => {
    const settings: ISettingModel[] = await SettingModel.find({
        category: SETTING_CATEGORY.INTERNAL,
    });

    return settings;
};

const updateSettingOrCreateSetting = async (name: string, category: SETTING_CATEGORY, value: any): Promise<ISettingModel> => {
    const sameSetting: ISettingModel | null = await SettingModel.findOne({
        category,
        name,
    });

    if (sameSetting) {
        sameSetting.value = value;
        await sameSetting.save();
        return sameSetting;
    } else {
        const newSetting: ISettingModel = new SettingModel({
            category,
            name,
            value,
        });

        await newSetting.save();
        return newSetting;
    }
};
