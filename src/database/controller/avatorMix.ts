/**
 * @author WMXPY
 * @fileoverview Avator Mix Controller
 */

import { touchDecrementAndSaveFile } from "../../util/data/file";
import { error, ERROR_CODE } from "../../util/error";
import { IFileManager } from "../../util/manager/file/import";
import { IAvatorCallback, IAvatorCreationConfig } from "../interface/avator";
import { AvatorModel, IAvatorModel } from "../model/avator";
import { FileModel, IFileModel } from "../model/file";
import { getFileById } from "./imageMix";

export const getFileByAvator = async (avatorName: string): Promise<IFileModel | null> => {
    const avator: IAvatorModel | null = await AvatorModel.findOne({ avator: avatorName });

    if (avator) {
        const file: IFileModel | null = await FileModel.findOne({ _id: avator.file });
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
    const sameHashFile: IFileModel | null = await FileModel.findOne({
        active: true,
        hash: option.hash,
    });
    const avator: IAvatorModel | null = await AvatorModel.findOne({ avator: option.avator });
    const manager: IFileManager = option.manager;

    const createOrUpdateFile = async (): Promise<IFileModel> => {
        if (sameHashFile) {
            sameHashFile.refIncrement();
            manager.release();
            await sameHashFile.save();
            return sameHashFile;
        } else {
            const path: string = await manager.save();
            const newFile: IFileModel = new FileModel({
                encoding: option.encoding,
                hash: option.hash,
                mime: option.mime,
                original: option.original,
                path,
                size: option.size,
            }).refIncrement();
            await newFile.save();
            return newFile;
        }
    };

    const file: IFileModel = await createOrUpdateFile();

    if (avator) {
        const originalFile: IFileModel = await getFileById(avator.file);
        await touchDecrementAndSaveFile(originalFile);

        avator.updateFile(file._id);
        await avator.save();
        return {
            avator: avator.avator,
            path: file.path,
        };
    } else {
        const newAvator: IAvatorModel = new AvatorModel({
            avator: option.avator,
            file: file._id,
        });
        await newAvator.save();
        return {
            avator: newAvator.avator,
            path: file.path,
        };
    }
};
