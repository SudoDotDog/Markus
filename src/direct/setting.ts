/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Settings
 */

import { IInternalSetting } from "../database/interface/setting";
import { ISettingModel } from "../database/model/setting";
import { error, ERROR_CODE } from "../util/error";

export const getTargetSettingByAllInternalSettingModels = <Key extends keyof IInternalSetting>(internals: ISettingModel[], setting: Key): IInternalSetting[Key] => {
    for (let internal of internals) {
        if (internal.name === setting) {
            return internal.value;
        }
    }

    throw error(ERROR_CODE.SETTING_NOT_SETTLED);
};
