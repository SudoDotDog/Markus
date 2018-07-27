/**
 * @author WMXPY
 * @fileoverview Avatar Controller
 */

import { error, ERROR_CODE } from "../../util/error";
import { IAvatarConfig } from "../interface/avatar";
import { AvatarModel, IAvatarModel } from "../model/avatar";

export const getAvatarByName = async (name: string): Promise<IAvatarModel> => {
    const avatar: IAvatarModel | null = await AvatarModel.findOne({ avatar: name });
    if (avatar) {
        return avatar;
    } else {
        throw error(ERROR_CODE.AVATAR_NOT_FOUND);
    }
};

export const createAvatar = async (option: IAvatarConfig): Promise<IAvatarModel> => {
    const newAvatar: IAvatarModel = new AvatarModel({
        avatar: option.avatar,
        file: option.file,
    });

    await newAvatar.save();
    return newAvatar;
};

export const createOrUpdateAvatarAndSave = async (option: IAvatarConfig): Promise<IAvatarModel> => {
    const avatar: IAvatarModel | null = await AvatarModel.findOne({ avatar: option.avatar });

    if (avatar) {

        avatar.updateFile(option.file);
        await avatar.save();
        return avatar;
    } else {
        const newAvatar: IAvatarModel = await createAvatar(option);
        return newAvatar;
    }
};

