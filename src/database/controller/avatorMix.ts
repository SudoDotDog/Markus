/**
 * @author WMXPY
 * @fileoverview Avator Mix Controller
 */

import { error, ERROR_CODE } from "../../util/error";
import { IAvatorCallback, IAvatorCreationConfig } from "../interface/avator";
import { AvatorModel, IAvatorModel } from "../model/avator";
import { FileModel, IFileModel } from "../model/file";

export const getFileByAvator = async (avatorName: string): Promise<IFileModel | null> => {
    const avator: IAvatorModel | null = await AvatorModel.findOne({ avator: avatorName });

    if (avator) {
        const file: IFileModel | null = await FileModel.findOne({ _id: avator.id });
        if (file) {
            return file;
        } else {
            throw error(ERROR_CODE.FILE_NOT_FOUND);
        }
    } else {
        return null;
    }
};

export const createOrUpdateAvator = async (option: IAvatorCreationConfig): Promise<IAvatorCallback> => {
    const avator: IAvatorModel | null = await AvatorModel.findOne({ avator: option.avator });

    const newFile: IFileModel = new FileModel({
        encoding: option.encoding,
        hash: option.hash,
        mime: option.mime,
        original: option.original,
        path: option.path,
        size: option.size,
    });
    await newFile.save();
    // TODO unlink old file

    if (avator) {
        avator.updateFile(newFile._id);
        await avator.save();
        return {
            id: avator._id,
            path: newFile.path,
        };
    } else {
        const newAvator: IAvatorModel = new AvatorModel({
            avator: option.avator,
            file: newFile._id,
        });
        await newAvator.save();
        return {
            id: newAvator._id,
            path: newFile.path,
        };
    }
};
