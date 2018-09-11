/**
 * @author WMXPY
 * @fileoverview Direct Controller
 */

import { IDirectConfig } from "../interface/direct";
import { IDirectModel, DirectModel } from "../model/direct";

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