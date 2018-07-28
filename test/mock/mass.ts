/**
 * @author WMXPY
 * @fileoverview Mock Create
 */

import { AvatarModel, IAvatarModel } from "../../src/database/model/avatar";
import { FileModel } from "../../src/database/model/file";

export const createRandomAvatarWithFile = async (avatar: string): Promise<IAvatarModel> => {
    const newFile = await new FileModel({
        encoding: 'test',
        hash: 'test',
        mime: 'test',
        original: 'test',
        folder: 'test',
        filename: 'test',
        size: 155,
    });

    await newFile.save();

    const newAvatar = await new AvatarModel({
        avatar,
        file: newFile._id,
    });

    await newAvatar.save();
    return newAvatar;
};
