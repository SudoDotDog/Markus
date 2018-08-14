/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Avatar
 */

import * as Controller from '../database/controller/import';
import { IAvatarCallback, IAvatarCreationConfig } from "../database/interface/avatar";
import { IFileProperty } from '../database/interface/file';
import { IAvatarModel } from '../database/model/avatar';
import { IFileModel } from "../database/model/file";
import { fileBuilder } from '../util/data/path';
import { error, ERROR_CODE } from '../util/error/error';
import { IFileManager } from '../util/manager/file/import';

export const createOrUpdateAvatar = async (option: IAvatarCreationConfig): Promise<IAvatarCallback> => {
    const hash: string = option.hash;
    const manager: IFileManager = option.manager;
    const property: IFileProperty = {
        encoding: option.encoding,
        mime: option.mime,
        original: option.original,
        size: option.size,
    };

    const file: IFileModel = await Controller.File.createOrUpdateAFileByHashAndManager(hash, manager, property);

    const avatar: IAvatarModel = await Controller.Avatar.createOrUpdateAvatarAndSave({
        avatar: option.avatar,
        file: file._id,
    });

    return {
        avatar: avatar.avatar,
        path: fileBuilder(file.folder, file.filename),
    };
};

export const rummageFileByAvatar = async (avatarName: string): Promise<IFileModel | null> => {
    const avatar: IAvatarModel | null = await Controller.Avatar.rummageAvatarByName(avatarName);

    if (avatar) {
        const file: IFileModel | null = await Controller.File.getActiveFileById(avatar.file);
        if (file) {
            return file;
        } else {
            throw error(ERROR_CODE.FILE_NOT_FOUND);
        }
    } else {
        return null;
    }
};
