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
    await AvatarModel.deleteMany({});
    await ImageModel.deleteMany({});
    await TagModel.deleteMany({});
    await FileModel.deleteMany({});
    await SettingModel.deleteMany({});
    return;
};
