/**
 * @author WMXPY
 * @description Direct
 * @fileoverview Direct
 */

import { ObjectID } from "bson";
import * as Controller from "../database/controller/import";
import { IDirectModel } from "../database/model/direct";
import { mkPathDir } from "../util/data/file";
import { pathBuilder } from "../util/data/path";
import { unique } from "../util/image";

export const startDirectFileCreationProgress = async (name: string, ctime?: Date): Promise<IDirectModel> => {
    const folder: string = 'Direct';
    mkPathDir(pathBuilder(folder));

    const direct: IDirectModel = await Controller.Direct.createDirect({
        folder,
        filename: unique(),
        name,
        ctime,
    });

    return direct;
};

export const finishDirectFileCreationProgress = async (id: ObjectID) => {
    return;
};
