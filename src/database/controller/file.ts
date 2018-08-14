/**
 * @author WMXPY
 * @fileoverview File Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error/error";
import { IFileManager } from "../../util/manager/file/import";
import { IFileConfig, IFileProperty } from '../interface/file';
import { FileModel, IFileModel } from "../model/file";

export const getFilesByIds = async (ids: ObjectID[]): Promise<IFileModel[]> => {
    const files: IFileModel[] = await FileModel.find({_id: ids});
    return files;
};

export const rummageSameFile = async (hash: string): Promise<IFileModel | null> => {
    const file: IFileModel | null = await FileModel.findOne({
        active: true,
        hash,
    });
    if (file) {
        return file;
    } else {
        return null;
    }
};

export const getActiveFileByHash = async (hash: string): Promise<IFileModel> => {
    const file: IFileModel | null = await FileModel.findOne({
        active: true,
        hash,
    });
    if (file) {
        return file;
    } else {
        throw error(ERROR_CODE.FILE_NOT_FOUND);
    }
};

export const getActiveFileById = async (id: ObjectID): Promise<IFileModel> => {
    const file: IFileModel | null = await FileModel.findOne({
        active: true,
        _id: id,
    });
    if (file) {
        return file;
    } else {
        throw error(ERROR_CODE.FILE_NOT_FOUND);
    }
};

export const createFile = async (option: IFileConfig): Promise<IFileModel> => {
    const newFile: IFileModel = new FileModel({
        encoding: option.encoding,
        hash: option.hash,
        mime: option.mime,
        original: option.original,
        folder: option.folder,
        filename: option.filename,
        size: option.size,
    });

    await newFile.save();
    return newFile;
};

export const createFileWithReference = async (option: IFileConfig): Promise<IFileModel> => {
    const newFile: IFileModel = new FileModel({
        encoding: option.encoding,
        hash: option.hash,
        mime: option.mime,
        original: option.original,
        folder: option.folder,
        filename: option.filename,
        size: option.size,
    });
    newFile.refIncrement();

    await newFile.save();
    return newFile;
};

export const createOrUpdateAFileByHashAndManager = async (hash: string, manager: IFileManager, property: IFileProperty): Promise<IFileModel> => {
    const hashedFile: IFileModel | null = await FileModel.findOne({
        active: true,
        hash,
    });

    if (hashedFile) {
        hashedFile.refIncrement();
        manager.release();

        await hashedFile.save();
        return hashedFile;
    } else {
        const { folder, filename } = await manager.save();
        const newFile: IFileModel = await createFileWithReference({
            encoding: property.encoding,
            hash,
            mime: property.mime,
            original: property.original,
            folder,
            filename,
            size: property.size,
        });

        await newFile.save();
        return newFile;
    }
};

export const getFileStringModelMapByFileIdsArray = async (fileIds: ObjectID[]): Promise<Map<string, IFileModel>> => {
    const fileMap: Map<string, IFileModel> = new Map<string, IFileModel>();
    const files: IFileModel[] = await FileModel.find({
        _id: {
            $in: fileIds,
        },
    });
    for (let file of files) {
        fileMap.set(file._id.toString(), file);
    }

    return fileMap;
};
