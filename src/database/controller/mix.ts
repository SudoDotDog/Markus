/**
 * @author WMXPY
 * @fileoverview Mix Controller
 */

import { AvatorModel } from "../model/avator";
import { FileModel } from "../model/file";
import { ImageModel } from "../model/image";
import { TagModel } from "../model/tag";

export const emptyDatabase = async (): Promise<void> => {
    await AvatorModel.remove({});
    await ImageModel.remove({});
    await TagModel.remove({});
    await FileModel.remove({});
    return;
};
