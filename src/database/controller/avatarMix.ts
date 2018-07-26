/**
 * @author WMXPY
 * @fileoverview Avatar Mix Controller
 */

import { touchDecrementAndRelease } from "../../util/data/file";
import { fileBuilder } from "../../util/data/path";
import { error, ERROR_CODE } from "../../util/error";
import { IFileManager } from "../../util/manager/file/import";
import { IAvatarCallback, IAvatarCreationConfig } from "../interface/avatar";
import { AvatarModel, IAvatarModel } from "../model/avatar";
import { FileModel, IFileModel } from "../model/file";
import { getFileById } from "./imageMix";

export const getFileByAvatar = async (avatarName: string): Promise<IFileModel | null> => {
    const avatar: IAvatarModel | null = await AvatarModel.findOne({ avatar: avatarName });

    if (avatar) {
        const file: IFileModel | null = await FileModel.findOne({ _id: avatar.file });
        if (file) {
            return file;
        } else {
            throw error(ERROR_CODE.FILE_NOT_FOUND);
        }
    } else {
        return null;
    }
};

export const createOrUpdateAvatar = async (option: IAvatarCreationConfig): Promise<IAvatarCallback> => {
    const sameHashFile: IFileModel | null = await FileModel.findOne({
        active: true,
        hash: option.hash,
    });
    const avatar: IAvatarModel | null = await AvatarModel.findOne({ avatar: option.avatar });
    const manager: IFileManager = option.manager;

    const createOrUpdateFile = async (): Promise<IFileModel> => {
        if (sameHashFile) {
            sameHashFile.refIncrement();
            manager.release();
            await sameHashFile.save();
            return sameHashFile;
        } else {
            const { folder, filename } = await manager.save();
            const newFile: IFileModel = new FileModel({
                encoding: option.encoding,
                hash: option.hash,
                mime: option.mime,
                original: option.original,
                folder,
                filename,
                size: option.size,
            }).refIncrement();
            await newFile.save();
            return newFile;
        }
    };

    const file: IFileModel = await createOrUpdateFile();

    if (avatar) {
        const originalFile: IFileModel = await getFileById(avatar.file);
        await touchDecrementAndRelease(originalFile);

        avatar.updateFile(file._id);
        await originalFile.save();
        await avatar.save();
        return {
            avatar: avatar.avatar,
            path: fileBuilder(file.folder, file.filename),
        };
    } else {
        const newAvatar: IAvatarModel = new AvatarModel({
            avatar: option.avatar,
            file: file._id,
        });
        await newAvatar.save();
        return {
            avatar: newAvatar.avatar,
            path: fileBuilder(file.folder, file.filename),
        };
    }
};
