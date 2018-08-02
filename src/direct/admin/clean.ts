/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Admin Clean
 */

import { AvatarModel } from "../../database/model/avatar";
import { FileModel } from "../../database/model/file";
import { ImageModel } from "../../database/model/image";
import { SettingModel } from "../../database/model/setting";
import { TagModel } from "../../database/model/tag";

export const emptyDatabase = async (): Promise<void> => {
    await AvatarModel.remove({});
    await ImageModel.remove({});
    await TagModel.remove({});
    await FileModel.remove({});
    await SettingModel.remove({});
    return;
};
