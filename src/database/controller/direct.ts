/**
 * @author WMXPY
 * @fileoverview Direct Controller
 */

import { ObjectID } from "bson";
import { error, ERROR_CODE } from "../../util/error/error";
import { IDirectConfig } from "../interface/direct";
import { DirectModel, IDirectModel } from "../model/direct";

export const createDirect = async (option: IDirectConfig): Promise<IDirectModel> => {
    const newDirect: IDirectModel = new DirectModel({
        ctime: option.ctime || new Date(),
        folder: option.folder,
        filename: option.filename,
        name: option.name,
        status: false,
    });

    await newDirect.save();
    return newDirect;
};

export const getDirectById = async (id: ObjectID): Promise<IDirectModel> => {
    const direct: IDirectModel | null = await DirectModel.findOne({ _id: id });
    if (!direct) {
        throw error(ERROR_CODE.DIRECT_NOT_FOUND);
    }

    return direct;
};

export const completeDirectById = async (id: ObjectID, hash: string, size: number): Promise<IDirectModel> => {
    const direct: IDirectModel | null = await DirectModel.findOne({ _id: id });
    if (!direct) {
        throw error(ERROR_CODE.DIRECT_NOT_FOUND);
    }

    direct.complete(hash, size);
    await direct.save();

    return direct;
};
