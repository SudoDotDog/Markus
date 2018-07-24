/**
 * @author WMXPY
 * @fileoverview Data File Utils
 */

import { IFileModel } from "../../database/model/file";
import { releaseStorage } from "../image";

export const touchDecrementAndSaveFile = async (file: IFileModel): Promise<void> => {
    file.refDecrement();
    if (file.touchRemove()) {
        await removeFile(file);
    }
    await file.save();
    return;
};

export const removeFile = async (file: IFileModel): Promise<void> => {
    await releaseStorage(file.path);
    return;
};
